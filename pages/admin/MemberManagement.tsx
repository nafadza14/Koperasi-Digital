
import React, { useState } from 'react';
import { MOCK_VILLAGES, MOCK_MEMBERS } from '../../constants';
import { Member } from '../../types';

interface MemberManagementProps {
  isSuper?: boolean;
}

const MemberManagement: React.FC<MemberManagementProps> = ({ isSuper = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
    totalSavings: 0,
    totalLoans: 0,
    monthlyDues: 'PAID' as 'PAID' | 'UNPAID',
  });

  const handleSaveMember = () => {
    if (editingMember) {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } : m));
    } else {
      const newMember: Member = {
        id: `MB-${1000 + members.length + 1}`,
        name: formData.name,
        status: formData.status,
        joinDate: new Date().toISOString().split('T')[0],
        totalSavings: formData.totalSavings,
        totalLoans: formData.totalLoans,
        monthlyDues: formData.monthlyDues,
        shuAllocated: 0,
        avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
      };
      setMembers([newMember, ...members]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingMember(null);
    setFormData({ name: '', status: 'ACTIVE', totalSavings: 0, totalLoans: 0, monthlyDues: 'PAID' });
  };

  const openEdit = (m: Member) => {
    setEditingMember(m);
    setFormData({
      name: m.name,
      status: m.status,
      totalSavings: m.totalSavings,
      totalLoans: m.totalLoans,
      monthlyDues: m.monthlyDues
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus anggota ini?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isSuper) {
    // Super Admin View (Simplified for this update)
    return (
      <div className="space-y-10 animate-fadeIn">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Pusat Kontrol Desa</h2>
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden p-10">
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Fitur Super Admin (Management Unit Desa) Aktif.</p>
          {/* Reuse logic from existing super admin view if needed */}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fadeIn relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Manajemen Anggota Desa</h2>
          <p className="text-slate-500 font-bold mt-2 flex items-center gap-2 uppercase tracking-widest text-[10px]">
             <i className="fas fa-users text-sky-400"></i> Database {members.length} Anggota Desa Merah Putih
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-sky-400 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black shadow-2xl shadow-sky-100 hover:bg-sky-500 transition-all uppercase tracking-widest text-xs"
        >
          <i className="fas fa-user-plus"></i> Tambah Anggota
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Simpanan Anggota</p>
           <h4 className="text-2xl font-black text-slate-800">Rp {(members.reduce((a, b) => a + b.totalSavings, 0) / 1000000).toFixed(2)}jt</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Anggota Aktif</p>
           <h4 className="text-2xl font-black text-emerald-500">{members.filter(m => m.status === 'ACTIVE').length} / {members.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tunggakan Iuran</p>
           <h4 className="text-2xl font-black text-red-400">{members.filter(m => m.monthlyDues === 'UNPAID').length} Orang</h4>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
        <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-8">
          <div className="relative w-full md:w-[500px]">
            <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Nama Anggota atau ID Member..." 
              className="w-full pl-16 pr-8 py-5 bg-slate-50 border-none rounded-3xl font-bold text-slate-700 focus:ring-4 focus:ring-sky-100"
            />
          </div>
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50 sticky top-0 z-10">
              <tr>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profil Anggota</th>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Simpanan & Pinjaman</th>
                <th className="text-left px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Iuran & SHU</th>
                <th className="text-right px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-sky-50/20 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                       <img src={member.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm border border-white" alt="m" />
                       <div>
                         <div className="font-black text-slate-800">{member.name}</div>
                         <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.id} • {member.status}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="font-bold text-slate-800 text-sm">Rp {member.totalSavings.toLocaleString()}</div>
                    <div className="text-[10px] font-bold text-red-400">Loan: Rp {member.totalLoans.toLocaleString()}</div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex flex-col gap-1">
                       <div className={`text-[9px] font-black px-2 py-0.5 rounded-full w-fit uppercase ${member.monthlyDues === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          Iuran: {member.monthlyDues}
                       </div>
                       <div className="text-[10px] font-black text-sky-400 uppercase tracking-widest">SHU: Rp {member.shuAllocated.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(member)} className="w-10 h-10 rounded-xl bg-slate-50 text-sky-400 hover:bg-sky-400 hover:text-white transition-all"><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleDelete(member.id)} className="w-10 h-10 rounded-xl bg-slate-50 text-red-400 hover:bg-red-400 hover:text-white transition-all"><i className="fas fa-trash"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 relative animate-slideUp">
            <button onClick={closeModal} className="absolute top-8 right-8 text-slate-300 hover:text-slate-600"><i className="fas fa-times text-xl"></i></button>
            <h3 className="text-2xl font-black text-slate-900 mb-8">{editingMember ? 'Edit Anggota' : 'Tambah Anggota Baru'}</h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700"
                  placeholder="Masukkan nama lengkap..."
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700"
                  >
                    <option value="ACTIVE">Aktif</option>
                    <option value="INACTIVE">Non-Aktif</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Iuran Wajib</label>
                  <select 
                    value={formData.monthlyDues}
                    onChange={(e) => setFormData({...formData, monthlyDues: e.target.value as any})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700"
                  >
                    <option value="PAID">Lunas</option>
                    <option value="UNPAID">Belum Bayar</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Total Simpanan (Rp)</label>
                  <input 
                    type="number" 
                    value={formData.totalSavings}
                    onChange={(e) => setFormData({...formData, totalSavings: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Total Pinjaman (Rp)</label>
                  <input 
                    type="number" 
                    value={formData.totalLoans}
                    onChange={(e) => setFormData({...formData, totalLoans: parseInt(e.target.value)})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700"
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveMember}
                className="w-full py-5 bg-sky-400 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-sky-100 hover:bg-sky-500 transition-all mt-4"
              >
                Simpan Anggota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberManagement;
