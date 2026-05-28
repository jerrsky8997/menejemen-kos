import React from 'react';
import { useNavigate } from 'react-router-dom';
// Contoh mengimport custom hooks TanStack Query yang nanti kamu buat
// import { useGetDashboardStats, useGetRecentTransactions } from '../hooks/useDashboard';

const Dashboard = () => {
  const navigate = useNavigate();

  // MOCK DATA (Ganti dengan data asli dari TanStack useQuery nanti)
  const stats = {
    totalKamar: 24,
    kamarKosong: 6,
    kamarTerisi: 18,
    pendapatanBulanIni: "Rp 21.600.000"
  };

  const recentTransactions = [
    { id: 1, nama: "Budi Santoso", kamar: "A1", tanggal: "28 Mei 2026", status: "Lunas" },
    { id: 2, nama: "Andi Wijaya", kamar: "B3", tanggal: "26 Mei 2026", status: "Nunggak" },
    { id: 3, nama: "Siti Rahma", kamar: "A5", tanggal: "25 Mei 2026", status: "Lunas" },
  ];

  return (
    <div className="min-h-screen bg-base-200 flex antialiased text-neutral selection:bg-primary/10">
      
      {/* 1. SIDEBAR (Kiri) - Bersih dan Minimalis */}
      <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-primary-content font-black text-lg text-white">
              r
            </div>
            <span className="text-lg font-bold tracking-tight text-neutral">roomies.</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-primary/10 text-primary font-medium text-sm text-left transition-all">
              <span>📊</span> Dashboard
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-neutral/70 hover:bg-base-200 hover:text-neutral font-medium text-sm text-left transition-all">
              <span>🛏️</span> Manajemen Kamar
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-neutral/70 hover:bg-base-200 hover:text-neutral font-medium text-sm text-left transition-all">
              <span>👥</span> Data Penghuni
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-neutral/70 hover:bg-base-200 hover:text-neutral font-medium text-sm text-left transition-all">
              <span>💸</span> Transaksi Sewa
            </button>
          </nav>
        </div>

        {/* User Profile / Logout di bawah Sidebar */}
        <div className="p-4 border-t border-base-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xs">AD</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold">Admin Kos</p>
              <p className="text-[10px] text-neutral/50">Owner</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-ghost btn-sm text-error hover:bg-error/10 p-1"
            title="Log Out"
          >
            🚪
          </button>
        </div>
      </aside>

      {/* 2. KONTEN UTAMA (Kanan) */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* Header Konten */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Overview Properti</h1>
            <p className="text-xs text-neutral/50">Pantau status bisnis hunian sewa Anda hari ini.</p>
          </div>
          <div className="text-sm font-medium bg-base-100 px-4 py-2 rounded-xl border border-base-300 shadow-sm">
            📅 {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* METRICS CARDS GRID (Sesuai aturan warna rich & minimalis kita) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          {/* Card Total Kamar */}
          <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-neutral/50 tracking-wider uppercase">Total Kamar</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold tracking-tight">{stats.totalKamar}</span>
              <span className="text-xs text-neutral/40">Unit</span>
            </div>
          </div>

          {/* Card Kamar Kosong (Hijau - Secondary) */}
          <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-neutral/50 tracking-wider uppercase">Kamar Kosong</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold tracking-tight text-secondary">{stats.kamarKosong}</span>
              <span className="text-xs text-neutral/40">Tersedia</span>
            </div>
          </div>

          {/* Card Kamar Terisi (Merah - Error) */}
          <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-neutral/50 tracking-wider uppercase">Kamar Terisi</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold tracking-tight text-error">{stats.kamarTerisi}</span>
              <span className="text-xs text-neutral/40">Tersewa</span>
            </div>
          </div>

          {/* Card Pendapatan */}
          <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-neutral/50 tracking-wider uppercase">Omzet Bulan Ini</span>
            <div className="mt-2">
              <span className="text-xl font-bold tracking-tight text-primary">{stats.pendapatanBulanIni}</span>
            </div>
          </div>

        </div>

        {/* TABLE DATA: Transaksi Terbaru */}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Aktivitas Pembayaran Terbaru</h2>
              <p className="text-xs text-neutral/50">Histori mutasi uang masuk dari penghuni kos.</p>
            </div>
            <button className="btn btn-sm btn-ghost text-primary text-xs normal-case">Lihat Semua ➔</button>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-sm w-full text-left">
              <thead>
                <tr className="border-b border-base-300 text-neutral/60 text-xs">
                  <th className="py-3 font-semibold">Nama Penghuni</th>
                  <th className="py-3 font-semibold">No. Kamar</th>
                  <th className="py-3 font-semibold">Tanggal Bayar</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-base-200 hover:bg-base-200/50 transition-all">
                    <td className="py-3.5 font-medium">{tx.nama}</td>
                    <td className="py-3.5 text-neutral/70">{tx.kamar}</td>
                    <td className="py-3.5 text-neutral/50">{tx.tanggal}</td>
                    <td className="py-3.5">
                      {tx.status === "Lunas" ? (
                        <span className="badge badge-success badge-sm text-white font-medium px-2.5 py-2">Lunas</span>
                      ) : (
                        <span className="badge badge-warning badge-sm text-white font-medium px-2.5 py-2">Menebus/Nunggak</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;