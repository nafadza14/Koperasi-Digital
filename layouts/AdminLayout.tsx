
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';

interface AdminLayoutProps {
  user: User;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const isSuper = user.role === UserRole.SUPER_ADMIN;

  const navItems = isSuper ? [
    { path: '/admin/dashboard', icon: 'fa-globe-asia', label: 'Financial Pusat' },
    { path: '/admin/members', icon: 'fa-city', label: 'Koperasi Desa' },
    { path: '/admin/inventory', icon: 'fa-warehouse', label: 'Logistik Nasional' },
    { path: '/admin/marketplace', icon: 'fa-shop', label: 'Marketplace Global' },
  ] : [
    { path: '/admin/dashboard', icon: 'fa-chart-line', label: 'Dashboard Desa' },
    { path: '/admin/members', icon: 'fa-users', label: 'Manajemen Anggota' },
    { path: '/admin/inventory', icon: 'fa-boxes-stacked', label: 'Gudang Desa' },
    { path: '/admin/marketplace', icon: 'fa-store', label: 'Marketplace' },
    { path: '/admin/accounting', icon: 'fa-calculator', label: 'Akuntansi & Keuangan' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-10">
            <img 
              src="https://desatepus.gunungkidulkab.go.id/assets/files/artikel/sedang_1763294672LOGO%20KDMP.jpg" 
              alt="Logo" 
              className="w-12 h-12 rounded-2xl shadow-xl object-cover"
            />
            <div>
              <span className="font-black text-sm text-slate-800 leading-tight block">KOPERASI DESA</span>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Merah Putih Digital</span>
            </div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-sky-400 text-white shadow-xl shadow-sky-100 scale-105'
                    : 'text-slate-500 hover:bg-slate-50 hover:pl-6'
                }`}
              >
                <i className={`fas ${item.icon} w-6 text-lg`}></i>
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-4">
          <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100">
             <p className="text-[10px] font-black text-sky-400 uppercase mb-1">Status Server</p>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Normal</span>
             </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
          >
            <i className="fas fa-power-off w-6"></i> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {navItems.find(i => i.path === location.pathname)?.label || 'Panel Kontrol'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
               <i className="fas fa-map-marker-alt text-[10px] text-sky-400"></i>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.village}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
              <i className="fas fa-calendar text-sky-400"></i>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Oktober 2023</span>
            </div>
            <button className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400 transition-all">
              <i className="fas fa-bell"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">{user.name}</p>
                <div className="inline-flex items-center gap-1 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">
                   <span className="text-[9px] font-black text-sky-500 uppercase tracking-widest">{user.role.replace('_', ' ')}</span>
                </div>
              </div>
              <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-2xl border-2 border-white shadow-lg object-cover" />
            </div>
          </div>
        </header>

        <div className="p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
