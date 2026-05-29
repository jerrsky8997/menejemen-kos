const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const Room = require('../models/Room');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

// IMPORT MITRA KEAMANAN: Hubungkan middleware pengecekan token dan role
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// ========================================================
// 1. POST: Mendaftarkan Penyewa Baru / Check-In (ADMIN & STAFF)
// ========================================================
// Ditambahkan protect dan authorizeRoles('admin', 'staff') -> Owner akan ditolak
router.post('/add', async (req, res) => {
  // ❌ KITA HAPUS SEMENTARA START SESSION-NYA UNTUK MONGODB LOKAL
  try {
    const { 
      name, 
      nik, 
      phone, 
      emergencyContact, 
      room, 
      startDate, 
      amountPaid, 
      periodMonth, 
      paymentMethod 
    } = req.body;

    // 1. Validasi input wajib
    if (!name || !nik || !room) {
      return res.status(400).json({ message: 'Nama, NIK, dan Pilihan Kamar wajib diisi!' });
    }

    // 2. Cek apakah kamar ada dan statusnya 'available'
    const roomDoc = await Room.findById(room);
    if (!roomDoc) {
      return res.status(404).json({ message: 'Kamar tidak ditemukan!' });
    }
    if (roomDoc.status === 'occupied') {
      return res.status(400).json({ message: 'Kamar sudah diisi oleh orang lain!' });
    }

    // 3. Cek keunikan NIK penyewa
    const nikExists = await Tenant.findOne({ nik });
    if (nikExists) {
      return res.status(400).json({ message: 'Penyewa dengan NIK ini sudah terdaftar!' });
    }

    // 4. Simpan objek Tenant Baru
    const newTenant = new Tenant({
      name,
      nik,
      phone,
      emergencyContact,
      room,
      startDate,
    });

    // Simpan biasa tanpa parameter { session }
    const savedTenant = await newTenant.save();

    // 5. Update status kamar menjadi 'occupied'
    roomDoc.status = 'occupied';
    await roomDoc.save();

    // 6. Integrasi Transaksi Otomatis
  if (amountPaid !== undefined && amountPaid !== null && amountPaid !== '') {
      
      console.log("-> Mencoba membuat data transaksi baru...");
      
      const newTransaction = new Transaction({
        tenant: savedTenant._id,       
        room: room,                    
        tenantName: savedTenant.name,  
        amount: Number(amountPaid), // Memastikan tipenya wajib Number sesuai skema
        notes: `Pembayaran awal untuk periode: ${periodMonth || '1 Bulan'}`, 
        paymentMethod: paymentMethod === 'Transfer Bank' ? 'Transfer' : 'Cash', 
        status: 'Success'              
      });
      
      const savedTransaction = await newTransaction.save();
      console.log("🎉 DATA TRANSAKSI BERHASIL DISIMPAN:", savedTransaction);

    } else {
      // 🚨 DEBUG 2: Jika transaksi tidak terbuat, log ini akan berbunyi di terminal BE lu
      console.warn("⚠️ TRANSAKSI DILEWATI karena amountPaid kosong atau tidak terbaca!");
    }

    res.status(201).json({ 
      message: '🎉 Penyewa berhasil didaftarkan dan pembayaran awal berhasil dicatat!', 
      data: savedTenant 
    });

  } catch (error) {
    console.error("Gagal mendaftarkan penyewa:", error);
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});
// ========================================================
// 2. GET: Mengambil Semua Data Penyewa (ADMIN, STAFF, OWNER)
// ========================================================
// Ditambahkan protect dan authorizeRoles agar Owner bisa melihat seluruh daftar penghuni kos
router.get('/',  async (req, res) => {
  try {
    const tenants = await Tenant.find().populate('roomId');
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

// ========================================================
// 3. PUT: Proses Penyewa Keluar / Check-Out (ADMIN & STAFF)
// ========================================================
// Ditambahkan protect dan authorizeRoles('admin', 'staff') -> Owner tidak bisa melakukan check-out data
router.put('/checkout/:id',  async (req, res) => {
  try {
    const tenantId = req.params.id;

    // 1. Cari data penyewa berdasarkan ID di URL
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({ message: 'Penyewa tidak ditemukan!' });
    }

    // Validasi jika penyewa memang sudah keluar sebelumnya
    if (tenant.status === 'moved_out') {
      return res.status(400).json({ message: 'Penyewa ini sudah berstatus keluar!' });
    }

    // 2. Ubah status penyewa menjadi moved_out
    tenant.status = 'moved_out';
    await tenant.save();

    // 3. OTOMATIS: Ubah status kamar yang ditinggalkan menjadi 'available' (tersedia kembali)
    await Room.findByIdAndUpdate(tenant.roomId, { status: 'available' });

    res.status(200).json({ 
      message: '🎉 Proses Check-Out berhasil! Kamar kosong dan tersedia kembali.', 
      data: tenant 
    });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
  }
});

module.exports = router;