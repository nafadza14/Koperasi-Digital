
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const AccountingAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'NERACA' | 'ARUS_KAS'>('NERACA');
  
  const [neracaAssets, setNeracaAssets] = useState([
    { id: 1, category: 'Kas & Bank', amount: 850000000 },
    { id: 2, category: 'Persediaan Barang', amount: 245000000 },
    { id: 3, category: 'Piutang Anggota', amount: 120000000 },
    { id: 4, category: 'Aset Tetap', amount: 450000000 },
  ]);

  const [neracaLiabilities, setNeracaLiabilities] = useState([
    { id: 1, category: 'Simpanan Sukarela', amount: 920000000 },
    { id: 2, category: 'Simpanan Wajib', amount: 350000000 },
    { id: 3, category: 'Modal Koperasi', amount: 395000000 },
  ]);

  const updateAsset = (id: number, val: string) => {
    const num = parseInt(val) || 0;
    setNeracaAssets(neracaAssets.map(a => a.id === id ? { ...a, amount: num } : a));
  };

  const updateLiability = (id: number, val: string) => {
    const num = parseInt(val) || 0;
    setNeracaLiabilities(neracaLiabilities.map(l => l.id === id ? { ...l, amount: num } : l));
  };

  const totalAssets = neracaAssets.reduce((a, b) => a + b.amount, 0);
  const totalLiabilities = neracaLiabilities.reduce((a, b) => a + b.amount, 0);

  const cashFlowData = [
    { name: 'Jan', masuk: 45, keluar: 32 },
    { name: 'Feb', masuk: 52, keluar: 41 },
    { name: 'Mar', masuk: 48, keluar: 38 },
    { name: 'Apr', masuk: 61, keluar: 45 },
    { name: 'May', masuk: 59, keluar: 48 },
    { name: 'Jun', masuk: 72, keluar: 52 },
  ];

  const formatCurrency = (val: number) => `Rp ${(val / 1000000).toFixed(1)}jt`;

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Akuntansi & Laporan Keuangan</h2>
          <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-[10px]">Neraca Terkonsolidasi Desa Merah Putih</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-[20px] shadow-sm border border-slate-100">
          <button 
            onClick={() => setActiveTab('NERACA')}
            className={`px-8 py-3 rounded-[15px] font-black text-[10px] tracking-widest transition-all ${activeTab === 'NERACA' ? 'bg-sky-400 text-white shadow-lg shadow-sky-100' : 'text-slate-400'}`}
          >
            NERACA
          </button>
          <button 
            onClick={() => setActiveTab('ARUS_KAS')}
            className={`px-8 py-3 rounded-[15px] font-black text-[10px] tracking-widest transition-all ${activeTab === 'ARUS_KAS' ? 'bg-sky-400 text-white shadow-lg shadow-sky-100' : 'text-slate-400'}`}
          >
            ARUS KAS
          </button>
        </div>
      </div>

      {activeTab === 'NERACA' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">AKTIVA (ASET)</h3>
            <div className="space-y-4">
              {neracaAssets.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                  <span className="text-sm font-bold text-slate-600">{item.category}</span>
                  <input 
                    type="number" 
                    className="bg-transparent text-right font-black text-slate-900 focus:ring-0 border-none w-32" 
                    value={item.amount} 
                    onChange={e => updateAsset(item.id, e.target.value)}
                  />
                </div>
              ))}
              <div className="pt-6 border-t-4 border-double border-slate-100 flex justify-between items-center">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Total Aktiva</span>
                <span className="text-2xl font-black text-sky-400">Rp {(totalAssets / 1000000000).toFixed(2)}M</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">PASIVA (KEWAJIBAN)</h3>
            <div className="space-y-4">
              {neracaLiabilities.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                  <span className="text-sm font-bold text-slate-600">{item.category}</span>
                  <input 
                    type="number" 
                    className="bg-transparent text-right font-black text-slate-900 focus:ring-0 border-none w-32" 
                    value={item.amount} 
                    onChange={e => updateLiability(item.id, e.target.value)}
                  />
                </div>
              ))}
              <div className="pt-6 border-t-4 border-double border-slate-100 flex justify-between items-center">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Total Pasiva</span>
                <span className="text-2xl font-black text-slate-800">Rp {(totalLiabilities / 1000000000).toFixed(2)}M</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm h-[500px]">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={cashFlowData}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
               <XAxis dataKey="name" axisLine={false} tickLine={false} />
               <YAxis axisLine={false} tickLine={false} />
               <Tooltip />
               <Area type="monotone" dataKey="masuk" stroke="#89CFF0" strokeWidth={4} fill="#89CFF0" fillOpacity={0.1} name="Masuk" />
               <Area type="monotone" dataKey="keluar" stroke="#f87171" strokeWidth={4} fill="#f87171" fillOpacity={0.1} name="Keluar" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AccountingAdmin;
