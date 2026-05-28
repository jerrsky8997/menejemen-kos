import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuickActionCards from '../components/QuickActionCards';

const Dashboard = () => {
  const navigate = useNavigate();

  // MOCK DATA (Nanti diganti query asli)
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

  const quickActions = [
    {id:1 , icon:"👤", title:"Check-In Tenant", description:"Daftarkan penghuni baru yang baru masuk kamar.", navigate:"tenant/registration" ,border:"border-primary/50" , buttonText: "Buka Formulir"},
    {id:2 , icon:"💵", title:"input bayar sewa", description:"Catat uang sewa masuk bulanan dari penghuni aktif", navigate:"/transaction", border:"border-secondary/50" , buttonText: "Catat Transaksi"},
    {id:3 , icon:"🔑", title:"Atur kondisi kamar", description:"ubah status ketersediaan perbaikan atau fasilitas", navigate:"room/add-room" , border:"border-accent/50" , buttonText : "Lihat Kamar"},
  ]

  return (

     <>
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

        {/* METRICS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-neutral/50 tracking-wider uppercase">Total Kamar</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold tracking-tight">{stats.totalKamar}</span>
              <span className="text-xs text-neutral/40">Unit</span>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-neutral/50 tracking-wider uppercase">Kamar Kosong</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold tracking-tight text-secondary">{stats.kamarKosong}</span>
              <span className="text-xs text-neutral/40">Tersedia</span>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-neutral/50 tracking-wider uppercase">Kamar Terisi</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold tracking-tight text-error">{stats.kamarTerisi}</span>
              <span className="text-xs text-neutral/40">Tersewa</span>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-neutral/50 tracking-wider uppercase">Omzet Bulan Ini</span>
            <div className="mt-2">
              <span className="text-xl font-bold tracking-tight text-primary">{stats.pendapatanBulanIni}</span>
            </div>
          </div>
        </div>

        {/* TABLE DATA: Transaksi Terbaru */}
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-6 mb-8">
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

        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold tracking-tight">Aksi Cepat Operasional</h2>
            <p className="text-xs text-neutral/50">Lakukan tindakan harian manajemen kos secara instan.</p>
          </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {quickActions.map((action) => (
              <>
                <QuickActionCards icon={action.icon} title={action.title} description={action.description} border={action.border} navigate={action.navigate} buttonText={action.buttonText} />
              </>
            ))}
            </div>
          </div>
     </>
  );
};

export default Dashboard;