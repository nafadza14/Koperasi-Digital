
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { UserRole, User, CartItem, Product } from './types';
import { MOCK_USER } from './constants';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import PWALayout from './layouts/PWALayout';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import MemberManagement from './pages/admin/MemberManagement';
import InventoryManagement from './pages/admin/InventoryManagement';
import MarketplaceAdmin from './pages/admin/MarketplaceAdmin';
import AccountingAdmin from './pages/admin/AccountingAdmin';

// PWA Pages (Member)
import HomePWA from './pages/pwa/HomePWA';
import SavingsPWA from './pages/pwa/SavingsPWA';
import MarketplacePWA from './pages/pwa/MarketplacePWA';
import ProfilePWA from './pages/pwa/ProfilePWA';
import PPOBPWA from './pages/pwa/PPOBPWA';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (role: UserRole) => {
    setUser({ ...MOCK_USER[role] });
    if (role === UserRole.ANGGOTA) {
      navigate('/m/home');
    } else {
      navigate('/admin/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    navigate('/');
  };

  const updateBalance = (amount: number) => {
    if (user) {
      setUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
    }
  };

  const withdrawShu = () => {
    if (user && user.shu > 0) {
      const amount = user.shu;
      setUser(prev => prev ? { ...prev, balance: prev.balance + amount, shu: 0 } : null);
      return true;
    }
    return false;
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        <img 
          src="https://desatepus.gunungkidulkab.go.id/assets/files/artikel/sedang_1763294672LOGO%20KDMP.jpg" 
          alt="Logo" 
          className="w-20 h-20 rounded-2xl shadow-xl animate-pulse mb-4 object-cover"
        />
        <div className="w-12 h-1 border-2 border-sky-100 border-t-sky-400 rounded-full animate-spin"></div>
        <div className="mt-4 text-slate-400 font-bold text-sm text-center uppercase tracking-widest">Koperasi Desa Digital</div>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<LandingPage onLogin={login} />} />

      {user && user.role !== UserRole.ANGGOTA && (
        <Route path="/admin" element={<AdminLayout user={user} onLogout={logout} />}>
          <Route path="dashboard" element={<DashboardAdmin user={user} />} />
          <Route path="members" element={<MemberManagement isSuper={user.role === UserRole.SUPER_ADMIN} />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="marketplace" element={<MarketplaceAdmin />} />
          <Route path="accounting" element={<AccountingAdmin />} />
          <Route index element={<Navigate to="dashboard" />} />
        </Route>
      )}

      {user && user.role === UserRole.ANGGOTA && (
        <Route path="/m" element={<PWALayout user={user} cartCount={cart.length} />}>
          <Route path="home" element={<HomePWA user={user} onWithdrawShu={withdrawShu} />} />
          <Route path="marketplace" element={<MarketplacePWA user={user} cart={cart} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} onClearCart={clearCart} onUpdateBalance={updateBalance} />} />
          <Route path="savings" element={<SavingsPWA user={user} onUpdateBalance={updateBalance} />} />
          <Route path="ppob" element={<PPOBPWA user={user} onUpdateBalance={updateBalance} />} />
          <Route path="profile" element={<ProfilePWA user={user} onLogout={logout} />} />
          <Route index element={<Navigate to="home" />} />
        </Route>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
