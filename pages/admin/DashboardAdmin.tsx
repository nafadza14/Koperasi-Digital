
import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { MOCK_VILLAGES, MOCK_MEMBERS, MOCK_PRODUCTS, MOCK_INVENTORY, COLORS } from '../../constants';
import { UserRole, User } from '../../types';

interface DashboardAdminProps {
  user: User;
}

const DashboardAdmin: React.FC<DashboardAdminProps> = ({ user }) => {
  const isSuper = user.role === UserRole.SUPER_ADMIN;
  const [timeRange, setTimeRange] = useState<'WEEK' | 'MONTH' | 'YEAR'>('MONTH');

  // Dynamic calculations based on mock data
  const stats = useMemo(() => {
    if (isSuper) {
      const totalAssets = MOCK_VILLAGES.reduce((acc, v) => acc + v.totalAssets, 0);
      const totalMembers = MOCK_VILLAGES.reduce((acc, v) => acc + v.memberCount, 0);
      return {
        mainLabel: "Total Aset Nasional",
        mainValue: `Rp ${(totalAssets / 1000000000).toFixed(2)}M`,
        subLabel: "Total Anggota",
        subValue: totalMembers.toLocaleString(),
        extraLabel: "Unit Koperasi",
        extraValue: MOCK_VILLAGES.length,
        trend: "+12.4%"
      };
    } else {
      const activeMembers = MOCK_MEMBERS.filter(m => m.status === 'ACTIVE').length;
      const lowStockCount = MOCK_INVENTORY.filter(i => i.quantity < i.minQuantity).length;
      return {
        mainLabel: "Omzet Bulan Ini",
        mainValue: "Rp 145.2Jt",
        subLabel: "Anggota Aktif",
        subValue: `${activeMembers} / ${MOCK_MEMBERS.length}`,
        extraLabel: "Alert Stok",
        extraValue: lowStockCount,
        trend: "+8.2%"
      };
    }
  }, [isSuper]);

  const chartData = useMemo(() => {
    const data = [
      { name: 'Jan', revenue: 420, expense: 310 },
      { name: 'Feb', revenue: 510, expense: 380 },
      { name: 'Mar', revenue: 480, expense: 410 },
      { name: 'Apr', revenue: 620, expense: 440 },
      { name: 'Mei', revenue: 580, expense: 420 },
      { name: 'Jun', revenue: 750, expense: 490 },
    ];
    return timeRange === 'WEEK' ? data.slice(-2) : data;
  }, [timeRange]);

  const categoryData = [
    { name: 'Sembako', value: 45, color: '#38bdf8' },
    { name: 'Pupuk', value: 30, color: '#4ade80' },
    { name: 'Alat Tani', value: 15, color: '#fbbf24' },
    { name: 'PPOB', value: 10, color: '#f87171' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stats.mainLabel}</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stats.mainValue}</h3>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stats.trend}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">vs Bulan Lalu</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stats.subLabel}</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stats.subValue}</h3>
          <div className="w-full bg-slate-50 h-2 rounded-full mt-5 overflow-hidden">
            <div className="bg-sky-400 h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stats.extraLabel}</p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stats.extraValue}</h3>
          <p className="text-[10px] font-bold text-slate-400 mt-4 flex items-center gap-2 uppercase tracking-widest">
            <i className={`fas ${isSuper ? 'fa-building' : 'fa-triangle-exclamation text-amber-500'}`}></i>
            {isSuper ? 'Unit Aktif' : 'Perlu Re-stock'}
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-200 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Estimasi SHU Berjalan</p>
            <h3 className="text-2xl font-black text-sky-400 tracking-tight">Rp 84.5Jt</h3>
          </div>
          <button className="text-[9px] font-black text-white bg-white/10 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/20 transition-all uppercase tracking-widest w-fit">Rincian SHU</button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Analisa Keuangan</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Perbandingan Pendapatan vs Pengeluaran</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
              {(['WEEK', 'MONTH', 'YEAR'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${timeRange === range ? 'bg-white text-sky-400 shadow-sm' : 'text-slate-400'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 800, fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" name="Pendapatan" />
                <Area type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={4} fillOpacity={0} name="Pengeluaran" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories / Task List */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Penjualan Terbanyak</h3>
            <div className="space-y-5">
              {categoryData.map((cat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">{cat.name}</span>
                    <span className="text-slate-900">{cat.value}%</span>
                  </div>
                  <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${cat.value}%`, backgroundColor: cat.color }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-50 hover:text-sky-400 transition-all border border-transparent hover:border-sky-100">
              Lihat Laporan Detail
            </button>
          </div>

          <div className="bg-sky-400 p-8 rounded-[3rem] text-white shadow-xl shadow-sky-100 group relative overflow-hidden">
             <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:rotate-12 transition-transform duration-700">
               <i className="fas fa-rocket text-[120px]"></i>
             </div>
             <h4 className="text-lg font-black mb-2 leading-tight">Mulai Audit Harian?</h4>
             <p className="text-xs text-sky-50 opacity-80 mb-6 font-medium">Lakukan pengecekan stok gudang dan kas harian sekarang.</p>
             <button className="w-full py-4 bg-white text-sky-400 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-xl active:scale-95 transition-all">Mulai Audit Sekarang</button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
           <h3 className="text-lg font-black text-slate-900 tracking-tight px-2">Aksi Cepat</h3>
           {[
             { icon: 'fa-plus-circle', label: 'Tambah Produk', color: 'text-emerald-500 bg-emerald-50' },
             { icon: 'fa-user-plus', label: 'Daftar Anggota', color: 'text-sky-500 bg-sky-50' },
             { icon: 'fa-file-invoice', label: 'Input Iuran', color: 'text-amber-500 bg-amber-50' },
             { icon: 'fa-truck-ramp-box', label: 'Stok Masuk', color: 'text-indigo-500 bg-indigo-50' },
           ].map((action, i) => (
             <button key={i} className="w-full flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${action.color} shadow-sm group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${action.icon}`}></i>
                </div>
                <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{action.label}</span>
             </button>
           ))}
        </div>

        <div className="lg:col-span-3 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-black text-slate-900 tracking-tight">Aktifitas Terkini</h3>
             <button className="text-[10px] font-black text-sky-400 uppercase tracking-widest hover:underline">Refresh</button>
           </div>
           
           <div className="space-y-6">
              {[
                { user: 'Agus Pratama', type: 'Pembelian Marketplace', time: '5 Menit yang lalu', amount: 'Rp 245,000', icon: 'fa-shopping-cart', color: 'bg-emerald-50 text-emerald-500' },
                { user: 'Siti Aminah', type: 'Setoran Iuran Wajib', time: '12 Menit yang lalu', amount: 'Rp 50,000', icon: 'fa-money-bill-wave', color: 'bg-sky-50 text-sky-500' },
                { user: 'Bambang Wijaya', type: 'Pencairan Pinjaman', time: '1 Jam yang lalu', amount: 'Rp 2,500,000', icon: 'fa-hand-holding-dollar', color: 'bg-amber-50 text-amber-500' },
                { user: 'Koperasi Desa', type: 'Stok Masuk: Pupuk Urea', time: '3 Jam yang lalu', amount: '+20 Karung', icon: 'fa-boxes-stacked', color: 'bg-indigo-50 text-indigo-500' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm ${activity.color}`}>
                       <i className={`fas ${activity.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800">{activity.user}</h4>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{activity.type}</span>
                         <span className="text-[10px] text-slate-300">•</span>
                         <span className="text-[10px] text-slate-300 font-bold italic">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${activity.amount.startsWith('-') ? 'text-red-500' : activity.amount.startsWith('+') ? 'text-indigo-500' : 'text-slate-900'}`}>{activity.amount}</p>
                    <i className="fas fa-chevron-right text-[10px] text-slate-200 group-hover:text-sky-400 transition-colors"></i>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
