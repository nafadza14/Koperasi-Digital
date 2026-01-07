
import React, { useState } from 'react';
import { User } from '../../types';

interface PPOBPWAProps {
  user: User;
  onUpdateBalance: (amount: number) => void;
}

const PPOBPWA: React.FC<PPOBPWAProps> = ({ user, onUpdateBalance }) => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [targetId, setTargetId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nominal, setNominal] = useState(50000);

  const services = [
    { label: 'Token Listrik', icon: 'fa-bolt', color: 'bg-amber-500', price: 50000 },
    { label: 'Pulsa / Data', icon: 'fa-mobile-screen', color: 'bg-blue-500', price: 25000 },
    { label: 'Air PDAM', icon: 'fa-droplet', color: 'bg-cyan-500', price: 75000 },
    { label: 'Internet', icon: 'fa-wifi', color: 'bg-indigo-500', price: 150000 },
    { label: 'BPJS', icon: 'fa-notes-medical', color: 'bg-green-500', price: 35000 },
    { label: 'Pajak PBB', icon: 'fa-landmark', color: 'bg-red-500', price: 100000 },
    { label: 'TV Kabel', icon: 'fa-tv', color: 'bg-slate-700', price: 90000 },
    { label: 'Zakat', icon: 'fa-hands-holding', color: 'bg-emerald-600', price: 50000 },
  ];

  const handlePay = () => {
    if (user.balance < nominal) {
      alert("Saldo Anda tidak cukup!");
      return;
    }
    onUpdateBalance(-nominal);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowConfirm(false);
      setSelectedService(null);
      setTargetId('');
    }, 3000);
  };

  return (
    <div className="p-6 animate-fadeIn pb-24 min-h-screen bg-slate-50">
      <header className="mb-10 pt-6">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Pembayaran & PPOB</h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Layanan Tagihan Digital Desa</p>
      </header>

      {/* Services Grid */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm mb-10">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Pilih Layanan</h3>
        <div className="grid grid-cols-4 gap-y-10 gap-x-2">
          {services.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedService(s)}
              className="flex flex-col items-center gap-3 active:scale-95 transition-all group"
            >
              <div className={`${s.color} w-13 h-13 rounded-[20px] flex items-center justify-center text-white shadow-lg group-hover:-translate-y-1 transition-transform`}>
                <i className={`fas ${s.icon} text-lg`}></i>
              </div>
              <span className="text-[9px] font-black text-slate-500 text-center leading-tight uppercase tracking-tight">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Pay History */}
      <div>
        <h3 className="font-black text-slate-900 tracking-tight mb-6">Riwayat Tagihan</h3>
        <div className="space-y-4">
          {[
            { label: 'Token Listrik Rumah', target: 'ID 5122 **** 894', type: 'fa-bolt', color: 'bg-amber-50 text-amber-500' },
            { label: 'Pulsa Handphone', target: '0812 4567 ****', type: 'fa-mobile-screen', color: 'bg-blue-50 text-blue-500' }
          ].map((bill, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-50 shadow-sm animate-slideUp">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 ${bill.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                  <i className={`fas ${bill.type}`}></i>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-800 tracking-tight">{bill.label}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{bill.target}</p>
                </div>
              </div>
              <button className="text-[9px] font-black text-sky-400 bg-sky-50 px-4 py-2 rounded-xl border border-sky-100 tracking-widest uppercase active:scale-95 transition-all">Bayar Lagi</button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Sheet */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] animate-fadeIn">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedService(null)}></div>
          <div className="absolute bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white rounded-t-[40px] p-10 animate-slideUp">
             {isSuccess ? (
                <div className="py-10 flex flex-col items-center animate-fadeIn">
                   <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-4xl mb-6 animate-bounce">
                     <i className="fas fa-check"></i>
                   </div>
                   <h4 className="text-2xl font-black text-slate-900 mb-2">Pembayaran Berhasil</h4>
                   <p className="text-sm font-medium text-slate-400 text-center">Tagihan {selectedService.label} Anda telah lunas.</p>
                </div>
             ) : (
                <>
                  <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-10"></div>
                  <div className="flex items-center gap-4 mb-8">
                     <div className={`${selectedService.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                        <i className={`fas ${selectedService.icon}`}></i>
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-slate-900 leading-tight">{selectedService.label}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaksi Digital</p>
                     </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">ID Pelanggan / Nomor HP</label>
                       <input 
                         type="text" 
                         value={targetId}
                         onChange={(e) => setTargetId(e.target.value)}
                         placeholder="Masukkan nomor..."
                         className="w-full px-6 py-5 bg-slate-50 border-none rounded-[25px] font-black text-slate-900 text-lg focus:ring-4 focus:ring-sky-100"
                       />
                    </div>
                    
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Pilih Nominal</label>
                       <div className="grid grid-cols-2 gap-3">
                          {[25000, 50000, 100000, 200000].map(val => (
                            <button 
                              key={val} 
                              onClick={() => setNominal(val)}
                              className={`py-4 rounded-2xl text-xs font-black transition-all border-2 ${
                                nominal === val ? 'bg-sky-400 text-white border-sky-400 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-sky-200'
                              }`}
                            >
                              Rp {val.toLocaleString()}
                            </button>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="p-6 bg-sky-50 rounded-[35px] border border-sky-100 mb-8 flex justify-between items-center">
                     <div>
                        <p className="text-[9px] font-black text-sky-400 uppercase mb-1">Total Bayar</p>
                        <p className="text-xl font-black text-slate-900">Rp {nominal.toLocaleString()}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Saldo Digital</p>
                        <p className="text-xs font-black text-slate-900">Rp {user.balance.toLocaleString()}</p>
                     </div>
                  </div>

                  <button 
                    disabled={!targetId}
                    onClick={handlePay}
                    className="w-full py-5 bg-sky-400 text-white rounded-[25px] font-black uppercase tracking-[0.2em] shadow-xl shadow-sky-100 active:scale-95 transition-all disabled:opacity-40"
                  >
                    Bayar Tagihan
                  </button>
                </>
             )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default PPOBPWA;
