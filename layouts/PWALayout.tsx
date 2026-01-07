
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { User } from '../types';

interface PWALayoutProps {
  user: User;
  cartCount: number;
}

const PWALayout: React.FC<PWALayoutProps> = ({ user, cartCount }) => {
  const location = useLocation();

  const navItems = [
    { path: '/m/home', icon: 'fa-house', label: 'Beranda' },
    { path: '/m/marketplace', icon: 'fa-bag-shopping', label: 'Belanja', badge: cartCount },
    { path: '/m/savings', icon: 'fa-wallet', label: 'Simpanan' },
    { path: '/m/ppob', icon: 'fa-bolt', label: 'Tagihan' },
    { path: '/m/profile', icon: 'fa-user', label: 'Akun' },
  ];

  return (
    <div className="pwa-container flex flex-col pb-24">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white/90 backdrop-blur-xl border-t border-slate-100 px-4 py-3 flex justify-around items-center z-[60] shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1 group relative"
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              location.pathname === item.path 
                ? 'bg-sky-400 text-white shadow-lg shadow-sky-100 scale-110' 
                : 'text-slate-400 active:scale-90'
            }`}>
              <i className={`fas ${item.icon} text-lg`}></i>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute top-1 right-0 w-4 h-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${
              location.pathname === item.path ? 'text-sky-400' : 'text-slate-400'
            }`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default PWALayout;
