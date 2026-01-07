
import React, { useState } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../../constants';
import { User, CartItem, Product } from '../../types';

interface MarketplacePWAProps {
  user: User;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  onUpdateBalance: (amount: number) => void;
}

const MarketplacePWA: React.FC<MarketplacePWAProps> = ({ 
  user, cart, onAddToCart, onRemoveFromCart, onClearCart, onUpdateBalance 
}) => {
  const [activeCat, setActiveCat] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'ADDRESS' | 'PAYMENT' | 'SUCCESS'>('ADDRESS');
  const [address, setAddress] = useState('Dusun Krajan RT 01 RW 02, Desa Merah Putih');

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    const totalWithShipping = cartTotal + 5000;
    if (totalWithShipping > user.balance) {
      alert("Saldo tidak cukup!");
      return;
    }
    setCheckoutStep('SUCCESS');
    onUpdateBalance(-totalWithShipping);
    onClearCart();
  };

  const handleBuyNow = (product: Product) => {
    // Check if product is already in cart to avoid duplicates or just add it
    onAddToCart(product);
    setShowCheckout(true);
    setCheckoutStep('ADDRESS');
  };

  return (
    <div className="animate-fadeIn pb-24 min-h-screen bg-slate-50">
      {/* Search Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-xl z-[40] px-6 py-4 border-b border-slate-100 flex items-center gap-4">
        <div className="flex-1 relative">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Cari produk desa..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-sky-400/20 text-sm font-bold"
          />
        </div>
        <button 
          onClick={() => setShowCart(true)}
          className="relative w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-400 shadow-sm active:scale-90 transition-all"
        >
          <i className="fas fa-cart-shopping"></i>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="p-6">
        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
          <button 
            onClick={() => setActiveCat('All')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeCat === 'All' ? 'bg-sky-400 text-white shadow-lg shadow-sky-100' : 'bg-white border border-slate-100 text-slate-400'
            }`}
          >
            Semua
          </button>
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCat(cat.name)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCat === cat.name ? 'bg-sky-400 text-white shadow-lg shadow-sky-100' : 'bg-white border border-slate-100 text-slate-400'
              }`}
            >
              <i className={`fas ${cat.icon}`}></i>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {MOCK_PRODUCTS.filter(p => activeCat === 'All' || p.category === activeCat).map((product) => (
            <div key={product.id} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow group animate-slideUp">
              <div className="relative aspect-square overflow-hidden">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {product.isSubsidy && (
                  <div className="absolute top-3 left-3 bg-red-400 text-white text-[8px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg uppercase tracking-widest z-10">
                    <i className="fas fa-certificate"></i> SUBSIDI
                  </div>
                )}
                {/* Wishlist Icon placeholder */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xs z-10">
                  <i className="far fa-heart"></i>
                </button>
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">{product.category}</p>
                <h4 className="text-[11px] font-black text-slate-800 line-clamp-2 mb-2 min-h-[32px] tracking-tight">{product.name}</h4>
                
                <div className="mt-auto space-y-3">
                  <div>
                    {product.originalPrice && (
                      <p className="text-[9px] text-slate-300 line-through">Rp {product.originalPrice.toLocaleString()}</p>
                    )}
                    <p className="text-sm font-black text-sky-500">Rp {product.price.toLocaleString()}</p>
                  </div>
                  
                  {/* Two Buttons Section */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="flex-1 h-9 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all hover:bg-sky-100 border border-sky-100"
                      title="Tambah ke Keranjang"
                    >
                      <i className="fas fa-cart-plus mr-1"></i> +
                    </button>
                    <button 
                      onClick={() => handleBuyNow(product)}
                      className="flex-[2] h-9 bg-sky-400 text-white rounded-xl flex items-center justify-center text-[9px] font-black uppercase tracking-widest shadow-lg shadow-sky-100 active:scale-95 transition-all hover:bg-sky-500"
                    >
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer Overlay */}
      {showCart && (
        <div className="fixed inset-0 z-[100] animate-fadeIn">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white rounded-t-[40px] p-8 shadow-2xl animate-slideUp">
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8"></div>
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-black text-slate-900">Keranjang Saya</h3>
               <button onClick={onClearCart} className="text-[10px] font-black text-red-400 uppercase tracking-widest">Kosongkan</button>
            </div>
            
            <div className="max-h-[350px] overflow-y-auto space-y-4 mb-8 no-scrollbar">
              {cart.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <i className="fas fa-shopping-basket text-4xl mb-4 opacity-20"></i>
                  <p className="text-sm font-bold">Keranjang Anda kosong</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="text-xs font-black text-slate-800 line-clamp-1">{item.name}</h4>
                      <p className="text-sky-400 font-black text-sm">Rp {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black bg-white px-3 py-1 rounded-lg border border-slate-100">{item.quantity}</span>
                      <button onClick={() => onRemoveFromCart(item.id)} className="text-red-400 p-2"><i className="fas fa-trash-can"></i></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-500">Total Produk</span>
                  <span className="text-2xl font-black text-slate-900">Rp {cartTotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => { setShowCart(false); setShowCheckout(true); setCheckoutStep('ADDRESS'); }}
                  className="w-full py-5 bg-sky-400 text-white rounded-[25px] font-black uppercase tracking-[0.2em] shadow-xl shadow-sky-100 active:scale-95 transition-all"
                >
                  Checkout Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Flow Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[110] bg-white animate-fadeIn">
          <header className="px-6 py-6 border-b border-slate-50 flex items-center gap-4">
            <button onClick={() => setShowCheckout(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <i className="fas fa-arrow-left"></i>
            </button>
            <h2 className="text-lg font-black text-slate-900">Proses Pesanan</h2>
          </header>

          <div className="p-8">
            {checkoutStep === 'ADDRESS' && (
              <div className="space-y-10 animate-slideRight">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-400">
                      <i className="fas fa-location-dot"></i>
                    </div>
                    <h3 className="font-black text-slate-900">Alamat Pengiriman</h3>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[30px] border-2 border-sky-400/20">
                    <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest mb-2">Alamat Utama</p>
                    <textarea 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-700 focus:ring-0 resize-none h-20"
                    />
                  </div>
                </div>

                <div>
                   <h3 className="font-black text-slate-900 mb-6">Ringkasan Pesanan</h3>
                   <div className="space-y-3">
                     <div className="flex justify-between text-sm">
                       <span className="text-slate-400 font-medium">Subtotal</span>
                       <span className="font-bold">Rp {cartTotal.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-slate-400 font-medium">Ongkos Kirim (Flat)</span>
                       <span className="font-bold">Rp 5.000</span>
                     </div>
                     <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                       <span className="text-slate-900 font-black">Total Akhir</span>
                       <span className="text-xl font-black text-sky-400">Rp {(cartTotal + 5000).toLocaleString()}</span>
                     </div>
                   </div>
                </div>

                <button 
                  onClick={() => setCheckoutStep('PAYMENT')}
                  className="w-full py-5 bg-sky-400 text-white rounded-[25px] font-black uppercase tracking-[0.2em] shadow-xl shadow-sky-100"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            )}

            {checkoutStep === 'PAYMENT' && (
              <div className="space-y-10 animate-slideRight">
                <div>
                  <h3 className="font-black text-slate-900 mb-6">Metode Pembayaran</h3>
                  <div className="space-y-4">
                    <button className="w-full p-6 bg-sky-50 border-2 border-sky-400 rounded-[30px] flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-400 shadow-sm">
                           <i className="fas fa-wallet"></i>
                         </div>
                         <div className="text-left">
                           <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest">Saldo Digital</p>
                           <p className="text-sm font-black text-slate-800">Rp {user.balance.toLocaleString()}</p>
                         </div>
                       </div>
                       <i className="fas fa-circle-check text-sky-400"></i>
                    </button>
                    <button className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[30px] flex items-center justify-between opacity-50 grayscale cursor-not-allowed">
                       <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                           <i className="fas fa-money-bill-wave"></i>
                         </div>
                         <div className="text-left">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tunai (COD)</p>
                           <p className="text-sm font-black text-slate-400">Bayar di Tempat</p>
                         </div>
                       </div>
                    </button>
                  </div>
                </div>

                <div className="p-8 bg-sky-50 rounded-[40px] border border-sky-100">
                  <p className="text-center text-[10px] font-bold text-sky-400 uppercase tracking-widest mb-4">Konfirmasi Pembayaran</p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-slate-500 font-bold">Total Belanja</span>
                    <span className="text-xl font-black text-slate-900">Rp {(cartTotal + 5000).toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-5 bg-sky-400 text-white rounded-[25px] font-black uppercase tracking-[0.2em] shadow-xl shadow-sky-100 active:scale-95 transition-all"
                  >
                    Bayar Sekarang
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 'SUCCESS' && (
              <div className="flex flex-col items-center justify-center pt-20 animate-slideUp">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-5xl mb-8 animate-bounce">
                  <i className="fas fa-check"></i>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 text-center">Pesanan Berhasil!</h3>
                <p className="text-slate-500 text-center text-sm leading-relaxed mb-12 max-w-[250px]">
                  Terima kasih! Pesanan Anda telah diterima dan akan segera dikirim oleh kurir desa.
                </p>
                <button 
                  onClick={() => { setShowCheckout(false); setCheckoutStep('ADDRESS'); }}
                  className="w-full py-5 bg-slate-900 text-white rounded-[25px] font-black uppercase tracking-[0.2em] active:scale-95 transition-all"
                >
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideRight { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slideRight { animation: slideRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default MarketplacePWA;
