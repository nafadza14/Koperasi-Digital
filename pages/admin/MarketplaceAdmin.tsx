
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../constants';
import { Product } from '../../types';

const MarketplaceAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sembako',
    price: 0,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop'
  });

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
    } else {
      const newProduct: Product = {
        id: `p${products.length + 1}`,
        ...formData
      };
      setProducts([newProduct, ...products]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', category: 'Sembako', price: 0, stock: 0, image: '' });
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({ ...p });
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Marketplace</h2>
          <p className="text-slate-500">Atur katalog produk dan pantau pesanan delivery order.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-sky-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-sky-700 shadow-lg shadow-sky-100"
          >
            <i className="fas fa-plus"></i> Produk Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.id} className="flex gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30 group hover:bg-slate-50 transition-colors">
                <img src={p.image} className="w-20 h-20 rounded-xl object-cover shadow-sm" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm truncate">{p.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">{p.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-sky-600">Rp {p.price.toLocaleString()}</span>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="text-sky-400"><i className="fas fa-edit"></i></button>
                      <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="text-red-400"><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-sky-600 rounded-2xl p-6 text-white shadow-xl">
             <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-money-bill-trend-up"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm">Pendapatan Terkini</h4>
                <p className="text-[10px] text-sky-100">Marketplace & Delivery</p>
              </div>
             </div>
             <p className="text-2xl font-bold">Rp {(products.length * 42000).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl">
             <button onClick={closeModal} className="absolute top-8 right-8 text-slate-300"><i className="fas fa-times"></i></button>
             <h3 className="text-2xl font-black mb-8">{editingProduct ? 'Edit Produk' : 'Produk Baru'}</h3>
             <div className="space-y-4">
               <input 
                 type="text" placeholder="Nama Produk" 
                 className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold"
                 value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
               />
               <select 
                 className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold"
                 value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
               >
                 <option>Sembako</option>
                 <option>Pupuk Subsidi</option>
                 <option>Peralatan Tani</option>
                 <option>Kebutuhan Harian</option>
               </select>
               <input 
                 type="number" placeholder="Harga (Rp)" 
                 className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold"
                 value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
               />
               <input 
                 type="number" placeholder="Stok" 
                 className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold"
                 value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
               />
               <button onClick={handleSave} className="w-full py-5 bg-sky-600 text-white rounded-2xl font-black uppercase shadow-lg">Simpan Produk</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceAdmin;
