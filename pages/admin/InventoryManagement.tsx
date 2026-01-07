
import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../../constants';
import { InventoryItem } from '../../types';

const InventoryManagement: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: 0,
    minQuantity: 10,
    warehouse: 'Gudang Desa Utama'
  });

  const handleSave = () => {
    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...i, ...formData, lastUpdated: new Date().toISOString().split('T')[0] } : i));
    } else {
      const newItem: InventoryItem = {
        id: `i${items.length + 1}`,
        ...formData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setItems([newItem, ...items]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ name: '', sku: '', quantity: 0, minQuantity: 10, warehouse: 'Gudang Desa Utama' });
  };

  const openEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus item dari inventaris?')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const lowStockItems = items.filter(i => i.quantity < i.minQuantity);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Pergudangan</h2>
          <p className="text-slate-500">Pantau stok barang dan distribusi kebutuhan desa.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-sky-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-sky-700 shadow-lg shadow-sky-100"
          >
            <i className="fas fa-plus"></i> Tambah Barang
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">SKU & Nama</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Gudang</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Jumlah Stok</th>
                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="text-right px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.sku}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{item.warehouse}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-800">{item.quantity}</span>
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${item.quantity < item.minQuantity ? 'bg-red-500' : 'bg-green-500'}`}
                              style={{width: `${Math.min((item.quantity/item.minQuantity)*50, 100)}%`}}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.quantity < item.minQuantity ? (
                          <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-100">Stok Menipis</span>
                        ) : (
                          <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold border border-green-100">Aman</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => openEdit(item)} className="text-slate-400 hover:text-sky-600 p-2"><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete(item.id)} className="text-slate-400 hover:text-red-600 p-2"><i className="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-triangle-exclamation text-amber-400"></i> Alert Stok
            </h3>
            {lowStockItems.length > 0 ? (
              <div className="space-y-4">
                {lowStockItems.map(i => (
                  <div key={i.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-sm">{i.name}</span>
                    <span className="font-bold text-red-400">{i.quantity}/{i.minQuantity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Semua stok dalam kondisi aman.</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl">
             <button onClick={closeModal} className="absolute top-8 right-8 text-slate-300"><i className="fas fa-times"></i></button>
             <h3 className="text-2xl font-black mb-8">{editingItem ? 'Edit Item' : 'Tambah Item'}</h3>
             <div className="space-y-4">
               <input 
                 type="text" placeholder="Nama Barang" 
                 className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold"
                 value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
               />
               <input 
                 type="text" placeholder="SKU" 
                 className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold"
                 value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})}
               />
               <div className="grid grid-cols-2 gap-4">
                 <input 
                   type="number" placeholder="Jumlah Stok" 
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold"
                   value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                 />
                 <input 
                   type="number" placeholder="Minimal Stok" 
                   className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold"
                   value={formData.minQuantity} onChange={e => setFormData({...formData, minQuantity: parseInt(e.target.value)})}
                 />
               </div>
               <button onClick={handleSave} className="w-full py-5 bg-sky-600 text-white rounded-2xl font-black uppercase shadow-lg">Simpan Perubahan</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
