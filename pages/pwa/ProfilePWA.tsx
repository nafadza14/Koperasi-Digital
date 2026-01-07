
import React from 'react';
import { User } from '../../types';

interface ProfilePWAProps {
  user: User;
  onLogout: () => void;
}

// Accept user as a prop to fix the type error in App.tsx where user is being passed
const ProfilePWA: React.FC<ProfilePWAProps> = ({ user, onLogout }) => {
  return (
    <div className="animate-fadeIn">
      <div className="p-8 text-center border-b border-slate-100 bg-white">
        <div className="relative inline-block mb-4">
          <img src={user.avatar} className="w-24 h-24 rounded-[32px] border-4 border-sky-50 shadow-xl object-cover" />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-sky-400 text-white rounded-xl flex items-center justify-center border-2 border-white shadow-md">
            <i className="fas fa-camera text-[10px]"></i>
          </button>
        </div>
        <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
        <p className="text-xs text-slate-400 mt-1">{user.village} • {user.id}</p>
        
        <div className="mt-6 flex justify-center gap-2">
          <span className="bg-sky-50 text-sky-500 text-[10px] font-bold px-3 py-1 rounded-full border border-sky-100 uppercase tracking-widest">Premium Member</span>
          <span className="bg-blue-50 text-blue-500 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest">Lunas Iuran</span>
        </div>
      </div>

      <div className="p-6 space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-4 mt-4">Pengaturan Akun</h3>
        {[
          { icon: 'fa-user-gear', label: 'Ubah Profil', color: 'text-slate-600' },
          { icon: 'fa-shield-halved', label: 'Keamanan & PIN', color: 'text-slate-600' },
          { icon: 'fa-address-book', label: 'Daftar Alamat', color: 'text-slate-600' },
          { icon: 'fa-bell', label: 'Notifikasi', color: 'text-slate-600' },
          { icon: 'fa-circle-question', label: 'Pusat Bantuan', color: 'text-slate-600' },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-sky-400 transition-colors">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <span className="text-sm font-bold text-slate-700">{item.label}</span>
            </div>
            <i className="fas fa-chevron-right text-xs text-slate-300"></i>
          </button>
        ))}

        <div className="pt-8">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-500 rounded-2xl font-bold active:scale-95 transition-all"
          >
            <i className="fas fa-sign-out-alt"></i> Keluar Aplikasi
          </button>
        </div>

        <div className="text-center py-10 opacity-30 grayscale flex flex-col items-center">
          <img 
            src="https://desatepus.gunungkidulkab.go.id/assets/files/artikel/sedang_1763294672LOGO%20KDMP.jpg" 
            alt="Logo" 
            className="w-12 h-12 rounded-xl mb-2 grayscale object-cover"
          />
          <div className="flex items-center justify-center gap-2 text-xl font-bold text-slate-800 mb-1">
            Koperasi Desa Digital
          </div>
          <p className="text-[10px] font-bold tracking-widest uppercase">Version 2.4.0 (Stable)</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePWA;
