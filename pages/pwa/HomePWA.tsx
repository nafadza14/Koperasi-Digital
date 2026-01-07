
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../constants';
import { User } from '../../types';

interface HomePWAProps {
  user: User;
  onWithdrawShu: () => boolean;
}

const HomePWA: React.FC<HomePWAProps> = ({ user, onWithdrawShu }) => {
  const navigate = useNavigate();
  const [withdrawing, setWithdrawing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleWithdraw = () => {
    if (user.shu <= 0) return;
    setWithdrawing(true);
    setTimeout(() => {
      onWithdrawShu();
      setWithdrawing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="pb-10 bg-slate-50 min-h-screen animate-fadeIn relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[80%] bg-emerald-500 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideDown">
          <i className="fas fa-circle-check text-xl"></i>
          <div>
            <p className="font-black text-xs uppercase tracking-widest">Berhasil!</p>
            <p className="text-[10px] opacity-90">SHU telah dipindahkan ke Saldo Utama.</p>
          </div>
        </div>
      )}

      {/* Header & Wallet Section Wrapper */}
      <div className="relative pb-24">
        {/* Background Header */}
        <div className="bg-sky-400 text-white px-8 pt-14 pb-32 rounded-b-[50px] shadow-lg relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-50px] left-[-20px] w-64 h-64 bg-sky-300/20 rounded-full blur-3xl"></div>
          
          <div className="relative flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
               <div className="relative">
                 <img 
                    src={user.avatar} 
                    className="w-14 h-14 rounded-2xl border-2 border-white/40 shadow-xl object-cover" 
                    alt="avatar" 
                 />
                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-sky-400 rounded-full shadow-sm"></div>
               </div>
               <div className="flex flex-col">
                 <p className="text-sky-100 text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-0.5">Koperasi Digital</p>
                 <h1 className="text-xl font-black tracking-tight leading-none">Halo, {user.name} 👋</h1>
               </div>
            </div>
            <div className="flex gap-2">
              <button className="w-11 h-11 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 active:scale-90 transition-all hover:bg-white/20">
                <i className="fas fa-bell text-white"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Wallet Card Overlay */}
        <div className="absolute left-6 right-6 bottom-4 z-20">
          <div className="bg-white p-6 rounded-[35px] shadow-[0_25px_60px_-15px_rgba(137,207,240,0.3)] border border-sky-50 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100">
                <i className="fas fa-shield-check text-[10px] text-sky-400"></i>
                <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest">Anggota Terverifikasi</span>
              </div>
              <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.1em]">{user.id}</p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5">Saldo Utama</p>
                  <p className="text-3xl font-black text-slate-900 leading-none">Rp {user.balance.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => navigate('/m/savings')}
                  className="w-10 h-10 bg-sky-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-100 active:scale-90 transition-all"
                >
                  <i className="fas fa-plus text-xs"></i>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-50">
                <div>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Total Simpanan</p>
                  <p className="text-lg font-black text-sky-400 leading-none">Rp {user.savings.toLocaleString()}</p>
                </div>
                <div className="pl-4 border-l border-slate-100">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Estimasi SHU</p>
                  <p className="text-lg font-black text-emerald-500 leading-none">Rp {user.shu.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="mt-8 px-6 space-y-10 animate-slideUp">
        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Tarik', icon: 'fa-money-bill-transfer', color: 'bg-indigo-50 text-indigo-500', path: '/m/savings' },
            { label: 'Top Up', icon: 'fa-plus', color: 'bg-sky-50 text-sky-500', path: '/m/savings' },
            { label: 'Kirim', icon: 'fa-paper-plane', color: 'bg-emerald-50 text-emerald-500', path: '/m/savings' },
            { label: 'Riwayat', icon: 'fa-clock-rotate-left', color: 'bg-slate-50 text-slate-500', path: '/m/savings' },
          ].map((item, i) => (
            <button key={i} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-2 group active:scale-90 transition-all">
              <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-lg shadow-sm group-hover:shadow-md transition-all border border-transparent hover:border-white/50`}>
                <i className={`fas ${item.icon}`}></i>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter text-center">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Featured Banner Card */}
        <div className="relative h-44 rounded-[40px] overflow-hidden shadow-xl shadow-sky-100/50 group cursor-pointer active:scale-[0.98] transition-all">
          <img 
            src="https://simkopdes.go.id/_next/image?url=%2Fimages%2Fgallery%2Fdok50.webp&w=750&q=75" 
            alt="banner" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent flex flex-col justify-center p-8">
            <div className="bg-sky-400 text-white text-[8px] font-black px-2.5 py-1 rounded-lg w-fit mb-3 uppercase tracking-[0.2em]">Program Desa</div>
            <h3 className="text-white font-black text-xl leading-tight mb-1">Simpanan Sukarela<br/><span className="text-sky-400">Mudharabah</span></h3>
            <p className="text-white/60 text-[10px] font-medium max-w-[160px]">Akses permodalan adil untuk kemandirian warga.</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <div className="flex justify-between items-center mb-6 px-1">
            <div>
               <h3 className="text-lg font-black text-slate-900 tracking-tight">Layanan Koperasi</h3>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Penuhi Kebutuhan Harian Anda</p>
            </div>
            <button onClick={() => navigate('/m/marketplace')} className="text-[10px] font-black text-sky-400 uppercase tracking-[0.1em] hover:text-sky-600 transition-colors">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.slice(0, 4).map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => navigate(cat.name === 'PPOB' ? '/m/ppob' : '/m/marketplace')}
                className="bg-white p-5 rounded-[30px] border border-slate-100 flex items-center gap-4 shadow-sm active:scale-95 transition-all hover:border-sky-200 hover:shadow-md cursor-pointer group"
              >
                <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-400 text-lg group-hover:bg-sky-400 group-hover:text-white transition-all">
                  <i className={`fas ${cat.icon}`}></i>
                </div>
                <span className="text-[11px] font-black text-slate-700 leading-tight uppercase tracking-tighter">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Accountability SHU Visual */}
        <div className="p-8 bg-slate-900 rounded-[45px] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
              <i className="fas fa-hand-holding-heart text-[140px]"></i>
           </div>
           <div className="relative z-10">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <h4 className="text-base font-black mb-1 tracking-tight">Bagi Hasil SHU</h4>
                 <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Tahun Buku 2023</p>
               </div>
               <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                 <i className="fas fa-chart-line text-sky-400"></i>
               </div>
             </div>
             
             <div className="mb-8">
               <p className="text-[10px] text-slate-500 font-black uppercase mb-1.5 tracking-widest">Hak Bagi Hasil Anda</p>
               <p className="text-3xl font-black text-sky-400">Rp {user.shu.toLocaleString()}</p>
             </div>
             
             <button 
                disabled={withdrawing || user.shu <= 0}
                onClick={handleWithdraw}
                className="w-full py-4 bg-sky-400 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-sky-900/40 active:scale-95 transition-all hover:bg-sky-500 disabled:opacity-50 disabled:grayscale"
             >
                {withdrawing ? 'Memproses...' : 'Tarik SHU ke Saldo'}
             </button>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default HomePWA;
