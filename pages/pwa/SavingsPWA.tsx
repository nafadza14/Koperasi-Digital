
import React, { useState } from 'react';
import { User } from '../../types';

interface SavingsPWAProps {
  user: User;
  onUpdateBalance: (amount: number) => void;
}

const SavingsPWA: React.FC<SavingsPWAProps> = ({ user, onUpdateBalance }) => {
  const [showModal, setShowModal] = useState<null | 'TOPUP' | 'WITHDRAW' | 'SUCCESS'>(null);
  const [amount, setAmount] = useState('');

  const handleAction = () => {
    const val = parseInt(amount);
    if (isNaN(val) || val <= 0) return;
    
    if (showModal === 'TOPUP') {
      onUpdateBalance(val);
    } else if (showModal === 'WITHDRAW') {
      if (val > user.balance) return;
      onUpdateBalance(-val);
    }
    
    setShowModal('SUCCESS');
    setTimeout(() => setShowModal(null), 2500);
    setAmount('');
  };

  return (
    <div className="p-6 space-y-8 animate-fadeIn pb-24 min-h-screen bg-slate-50">
      <header className="flex justify-between items-center mb-6 pt-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Simpan Pinjam</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Keuangan Koperasi Desa</p>
        </div>
        <button className="w-11 h-11 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
          <i className="fas fa-ellipsis-h text-slate-400"></i>
        </button>
      </header>

      {/* Main Stats Card */}
      <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
          <i className="fas fa-vault text-8xl"></i>
        </div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Saldo Aktif</p>
        <h3 className="text-4xl font-black mb-8 tracking-tight">Rp {user.balance.toLocaleString()}</h3>
        
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md border border-white/10">
            <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Simpanan Wajib</p>
            <p className="font-black text-sky-400">Rp {user.savings.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md border border-white/10">
            <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Tagihan Pinjaman</p>
            <p className="font-black text-red-400">Rp {user.loan.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Top Up', icon: 'fa-plus', color: 'text-sky-600 bg-sky-50', action: () => setShowModal('TOPUP') },
          { label: 'Tarik', icon: 'fa-money-bill-transfer', color: 'text-indigo-600 bg-indigo-50', action: () => setShowModal('WITHDRAW') },
          { label: 'Iuran', icon: 'fa-calendar-check', color: 'text-emerald-600 bg-emerald-50', action: () => {} },
        ].map((item, i) => (
          <button key={i} onClick={item.action} className={`flex flex-col items-center gap-3 p-5 bg-white rounded-[30px] border border-slate-100 shadow-sm active:scale-95 transition-all hover:border-sky-200`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg ${item.color} shadow-sm`}>
              <i className={`fas ${item.icon}`}></i>
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>

      {/* History */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-slate-900 tracking-tight">Mutasi Rekening</h3>
          <button className="text-[10px] font-black text-sky-400 uppercase tracking-widest underline">Lihat Semua</button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Top Up Saldo Digital', date: '22 Okt, 14:20', amount: '+Rp 200,000', type: 'in' },
            { label: 'Belanja Marketplace', date: '21 Okt, 09:10', amount: '-Rp 112,500', type: 'out' },
            { label: 'Pencairan SHU', date: '20 Okt, 10:01', amount: '+Rp 845,000', type: 'in' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-50 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm ${item.type === 'in' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                  <i className={`fas ${item.type === 'in' ? 'fa-arrow-down-long' : 'fa-arrow-up-long'}`}></i>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">{item.label}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.date}</p>
                </div>
              </div>
              <p className={`text-sm font-black ${item.type === 'in' ? 'text-emerald-500' : 'text-slate-900'}`}>{item.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Modals */}
      {(showModal === 'TOPUP' || showModal === 'WITHDRAW') && (
        <div className="fixed inset-0 z-[100] animate-fadeIn">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(null)}></div>
          <div className="absolute bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white rounded-t-[40px] p-10 animate-slideUp">
             <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-10"></div>
             <h3 className="text-2xl font-black text-slate-900 mb-2">
               {showModal === 'TOPUP' ? 'Isi Saldo Digital' : 'Tarik Dana ke Bank'}
             </h3>
             <p className="text-xs text-slate-400 mb-8 font-medium">Platform Koperasi Desa Mandiri Digital</p>
             
             <div className="relative mb-10">
               <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-black text-sky-400">Rp</span>
               <input 
                 type="number" 
                 value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                 placeholder="0"
                 className="w-full pl-16 pr-6 py-6 bg-slate-50 border-none rounded-[25px] text-2xl font-black text-slate-900 focus:ring-4 focus:ring-sky-100"
               />
             </div>

             <div className="grid grid-cols-3 gap-3 mb-10">
                {[50000, 100000, 500000].map(val => (
                  <button 
                    key={val} 
                    onClick={() => setAmount(val.toString())}
                    className="py-3 bg-white border-2 border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-sky-400 hover:text-sky-400 transition-all active:scale-95"
                  >
                    Rp {val/1000}k
                  </button>
                ))}
             </div>

             <button 
                disabled={!amount}
                onClick={handleAction}
                className="w-full py-5 bg-sky-400 text-white rounded-[25px] font-black uppercase tracking-[0.2em] shadow-xl shadow-sky-100 active:scale-95 transition-all"
             >
                Konfirmasi Transaksi
             </button>
          </div>
        </div>
      )}

      {showModal === 'SUCCESS' && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-10 animate-fadeIn">
           <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-5xl mb-8 animate-bounce">
              <i className="fas fa-check"></i>
           </div>
           <h3 className="text-3xl font-black text-slate-900 mb-4">Transaksi Berhasil</h3>
           <p className="text-slate-500 text-center font-medium max-w-[280px]">Saldo Anda telah diperbarui secara real-time. Terima kasih telah menggunakan layanan Koperasi.</p>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default SavingsPWA;
