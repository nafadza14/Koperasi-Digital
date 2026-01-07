import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: "Belanja Lebih Seru",
    description: "Marketplace desa yang menghadirkan produk lokal berkualitas langsung ke tangan Anda dengan kemudahan delivery order.",
    image: "https://simkopdes.go.id/_next/image?url=%2Fimages%2Fgallery%2Fdok5.webp&w=750&q=75",
    badge: "MARKETPLACE DESA"
  },
  {
    id: 2,
    title: "Distribusi Tepat Sasaran",
    description: "Memastikan penyaluran kebutuhan pokok dan subsidi warga berjalan lancar, transparan, dan terukur.",
    image: "https://simkopdes.go.id/_next/image?url=%2Fimages%2Fgallery%2Fdok8.webp&w=750&q=75",
    badge: "EFISIENSI LOGISTIK"
  },
  {
    id: 3,
    title: "Masa Depan Ekonomi Indonesia",
    description: "Membangun kedaulatan ekonomi bangsa mulai dari tingkat desa dengan pemanfaatan teknologi digital terpadu.",
    image: "https://simkopdes.go.id/_next/image?url=%2Fimages%2Fgallery%2Fdok50.webp&w=750&q=75",
    badge: "EKONOMI KERAKYATAN"
  },
  {
    id: 4,
    title: "Kebutuhan Tani Terpenuhi",
    description: "Nikmati kemudahan akses kebutuhan harian dan peralatan tani dalam satu platform yang mudah digunakan.",
    image: "https://simkopdes.go.id/_next/image?url=%2Fimages%2Fgallery%2Fdok7.webp&w=750&q=75",
    badge: "KEMUDAHAN AKSES"
  },
  {
    id: 5,
    title: "Simpanan Transparan",
    description: "Pantau saldo simpanan, iuran, dan bagi hasil SHU secara real-time demi akuntabilitas keuangan bersama.",
    image: "https://amartha.com/_next/image/?url=https%3A%2F%2Faccess.amartha.com%2Fuploads%2Fmengenal_koperasi_simpan_pinjam_cara_kerja_dan_sumber_dana_2de42477af.jpeg&w=640&q=75",
    badge: "TRANSPARANSI TOTAL"
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const LOGO_URL = "https://desatepus.gunungkidulkab.go.id/assets/files/artikel/sedang_1763294672LOGO%20KDMP.jpg";

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="Koperasi Desa Digital" 
              className="w-10 h-10 rounded-xl shadow-lg shadow-sky-100 object-cover"
            />
            <span className="font-bold text-xl tracking-tight text-slate-800">Koperasi Desa Digital</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {/* Navigation links removed as requested */}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setAuthMode('LOGIN'); setShowAuth(true); }}
              className="text-sm font-bold text-slate-700 px-6 py-2.5 hover:bg-slate-50 rounded-full transition-all"
            >
              Masuk
            </button>
            <button 
              onClick={() => { setAuthMode('SIGNUP'); setShowAuth(true); }}
              className="text-sm font-bold bg-sky-400 text-white px-8 py-2.5 rounded-full shadow-xl shadow-sky-100 hover:bg-sky-500 hover:-translate-y-0.5 transition-all"
            >
              Daftar Anggota
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-sky-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-red-50 rounded-full blur-3xl opacity-40"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-sky-500 uppercase tracking-widest">Ekosistem Koperasi Masa Kini</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                Mudahnya Jadi <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-slate-400">Anggota Koperasi</span><br/>
                Desa Merah Putih Digital
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
                Proses pendaftaran cepat, akses pinjaman mudah, dan belanja kebutuhan desa lebih hemat hanya dalam satu aplikasi.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                <button 
                  onClick={() => { setAuthMode('SIGNUP'); setShowAuth(true); }}
                  className="w-full sm:w-auto bg-sky-400 text-white px-10 py-4 rounded-2xl font-bold hover:bg-sky-500 shadow-xl shadow-sky-100 hover:-translate-y-1 transition-all"
                >
                  Gabung Sekarang
                </button>
                {/* Lihat Video button removed as requested */}
              </div>

              <div className="flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=user${i}`} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" />
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-500">
                  <span className="text-slate-900 font-bold">12,400+</span> Anggota Aktif
                </p>
              </div>
            </div>

            {/* Carousel Feature */}
            <div className="relative group">
              <div className="relative h-[550px] w-full rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white group-hover:shadow-sky-200 transition-all duration-700">
                {CAROUSEL_ITEMS.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-12">
                      <div className="mb-4 translate-y-2 opacity-0 animate-slideUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                         <span className="bg-gradient-to-r from-sky-400 to-white bg-clip-text text-transparent text-[10px] font-black uppercase tracking-[0.2em] border border-sky-400/30 px-3 py-1.5 rounded-full">
                           {item.badge}
                         </span>
                      </div>
                      <h3 className="text-3xl font-black mb-4 translate-y-2 opacity-0 animate-slideUp bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed translate-y-2 opacity-0 animate-slideUp" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {CAROUSEL_ITEMS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2 transition-all duration-300 rounded-full ${
                      index === activeSlide ? 'w-10 bg-sky-400' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={() => setActiveSlide((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white/40"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button 
                onClick={() => setActiveSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white/40"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Marketplace */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Marketplace Unggulan Desa</h2>
              <p className="text-slate-500">Kebutuhan harian hingga alat tani kualitas premium.</p>
            </div>
            <button className="text-sky-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Semua Produk <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {MOCK_PRODUCTS.slice(0, 5).map((p) => (
              <div key={p.id} className="bg-white rounded-[2rem] p-4 border border-slate-100 hover:shadow-2xl hover:shadow-sky-100/50 transition-all group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {p.isSubsidy && (
                    <div className="absolute top-2 left-2 bg-red-400 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                      SUBSIDI
                    </div>
                  )}
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{p.name}</h4>
                <p className="text-sky-500 font-extrabold">Rp {p.price.toLocaleString()}</p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
                  <i className="fas fa-location-dot"></i> Gudang Pusat
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kemudahan Menjadi Anggota Section */}
      <section className="py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50"></div>
              <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(137,207,240,0.4)] border-8 border-slate-50">
                <img 
                  src="https://i.pinimg.com/736x/17/2c/af/172cafb2bd6daf8768549cff193b4f19.jpg" 
                  alt="App Preview" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-[240px] animate-bounce-slow">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-sky-400 rounded-xl flex items-center justify-center text-white">
                    <i className="fas fa-check"></i>
                  </div>
                  <span className="font-black text-slate-800 text-sm tracking-tight">Terverifikasi</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Ekosistem aman dan terintegrasi dengan data desa.</p>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <span className="text-sky-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">TRANSFORMASI DIGITAL</span>
                <h2 className="text-5xl font-black text-slate-900 leading-tight mb-6">Kemudahan Menjadi <br/><span className="text-sky-400">Anggota Koperasi</span></h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">Nikmati pengalaman mengelola keuangan dan kebutuhan desa yang revolusioner. Semuanya dalam satu genggaman tangan Anda.</p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Pendaftaran Instan & Mudah",
                    desc: "Cukup dengan KTP dan verifikasi desa, Anda langsung tergabung dalam ekosistem ekonomi digital.",
                    icon: "fa-id-card",
                    color: "bg-sky-50 text-sky-400"
                  },
                  {
                    title: "Akses Marketplace Prioritas",
                    desc: "Dapatkan harga khusus anggota untuk produk sembako, pupuk subsidi, dan kebutuhan tani lainnya.",
                    icon: "fa-shopping-bag",
                    color: "bg-emerald-50 text-emerald-400"
                  },
                  {
                    title: "Pantau SHU Secara Real-Time",
                    desc: "Transparansi total pembagian Sisa Hasil Usaha (SHU) yang bisa dipantau dan ditarik langsung ke saldo digital.",
                    icon: "fa-chart-pie",
                    color: "bg-amber-50 text-amber-400"
                  },
                  {
                    title: "Satu Saldo Untuk Semua Tagihan",
                    desc: "Bayar listrik, air, pulsa, hingga iuran BPJS menggunakan saldo simpanan koperasi dengan mudah.",
                    icon: "fa-bolt",
                    color: "bg-indigo-50 text-indigo-400"
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all group-hover:scale-110 shadow-sm ${feature.color}`}>
                      <i className={`fas ${feature.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-800 mb-1 group-hover:text-sky-400 transition-colors">{feature.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => { setAuthMode('SIGNUP'); setShowAuth(true); }}
                className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-sky-400 transition-all shadow-xl shadow-slate-100"
              >
                Mulai Gabung Sekarang <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Layanan Terintegrasi</h2>
             <p className="text-slate-500 max-w-2xl mx-auto">Dari penyaluran pupuk bersubsidi hingga pembayaran tagihan digital, kami hadir memberikan kemudahan bagi masyarakat desa.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-gradient-to-br from-sky-400 to-sky-600 rounded-[3rem] p-12 text-white relative overflow-hidden group cursor-pointer">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <i className="fas fa-seedling text-4xl mb-8"></i>
                    <h3 className="text-3xl font-bold mb-4">Program Subsidi Pupuk</h3>
                    <p className="text-sky-50 max-w-sm">Akses distribusi pupuk bersubsidi yang tepat sasaran, transparan, dan mudah dipantau oleh setiap petani anggota.</p>
                  </div>
                  <button className="mt-12 bg-white text-sky-500 font-bold px-8 py-4 rounded-2xl w-fit hover:bg-sky-50 transition-colors">
                    Cek Kuota Saya
                  </button>
                </div>
                <div className="absolute right-[-10%] bottom-[-10%] opacity-20 group-hover:scale-110 transition-transform duration-700">
                  <i className="fas fa-tractor text-[300px]"></i>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-100 relative overflow-hidden group hover:border-sky-200 transition-all cursor-pointer">
                <i className="fas fa-wallet text-3xl text-sky-400 mb-8"></i>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Simpan Pinjam Digital</h3>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed">Kelola tabungan, ajukan pinjaman usaha, dan pantau bagi hasil SHU secara real-time melalui aplikasi mobile.</p>
                <div className="w-16 h-16 bg-sky-50 text-sky-400 rounded-full flex items-center justify-center absolute bottom-10 right-10 group-hover:translate-x-2 transition-transform">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group cursor-pointer">
                <i className="fas fa-bolt text-3xl text-amber-400 mb-8"></i>
                <h3 className="text-2xl font-bold mb-4">PPOB & Tagihan</h3>
                <p className="text-slate-400 mb-8 text-sm leading-relaxed">Beli pulsa, token listrik, hingga bayar BPJS langsung dari saldo simpanan koperasi Anda.</p>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                  <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                  <div className="w-8 h-8 bg-white/10 rounded-lg"></div>
                </div>
              </div>

              <div className="md:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-100 flex items-center gap-12 group cursor-pointer">
                <div className="w-1/2">
                   <h3 className="text-2xl font-bold text-slate-800 mb-4">Delivery Order Desa</h3>
                   <p className="text-slate-500 text-sm mb-6">Nikmati kemudahan belanja dari rumah. Kurir desa kami siap mengantarkan kebutuhan harian hingga pupuk ke depan pintu rumah Anda.</p>
                   <button className="text-sky-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                     Pelajari Selengkapnya <i className="fas fa-arrow-right"></i>
                   </button>
                </div>
                <div className="w-1/2 rounded-[2rem] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 py-20 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={LOGO_URL} 
                alt="Logo" 
                className="w-10 h-10 rounded-xl shadow-md object-cover"
              />
              <span className="font-bold text-2xl text-slate-800">Koperasi Desa Digital</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8">Platform ekosistem digital Koperasi Desa Digital untuk mewujudkan kedaulatan ekonomi masyarakat desa melalui teknologi modern.</p>
            <div className="flex gap-4">
              {[ 'facebook', 'instagram', 'twitter', 'youtube' ].map(soc => (
                <a key={soc} href="#" className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-400 transition-all">
                  <i className={`fab fa-${soc}`}></i>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Menu</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Simpan Pinjam</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">PPOB Digital</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Distribusi Subsidi</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Kontak</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>Kantor Desa Merah Putih, Blok A1, Kec. Mandiri, Indonesia.</li>
              <li>info@simkopdes.go.id</li>
              <li>+62 812 3456 7890</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs font-medium">
          &copy; 2024 Koperasi Desa Digital Ecosystem. All Rights Reserved.
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative p-12">
            <button 
              onClick={() => setShowAuth(false)}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="text-center mb-10">
              <img 
                src={LOGO_URL} 
                alt="Brand" 
                className="w-16 h-16 rounded-2xl mx-auto mb-6 shadow-xl object-cover"
              />
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                {authMode === 'LOGIN' ? 'Selamat Datang Kembali' : 'Gabung Koperasi Kami'}
              </h2>
              <p className="text-slate-500 font-medium">Platform Koperasi Desa Digital</p>
            </div>

            <div className="space-y-4">
               {authMode === 'SIGNUP' && (
                  <button 
                    onClick={() => onLogin(UserRole.ANGGOTA)}
                    className="w-full bg-sky-400 text-white py-4 rounded-2xl font-bold shadow-xl shadow-sky-100 hover:bg-sky-500 transition-all flex items-center justify-center gap-3"
                  >
                    <i className="fas fa-user-plus"></i> Daftar Jadi Anggota
                  </button>
               )}
               
               {authMode === 'LOGIN' && (
                  <>
                    <button 
                      onClick={() => onLogin(UserRole.ANGGOTA)}
                      className="w-full bg-white border-2 border-slate-100 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                    >
                      <i className="fas fa-users text-sky-400"></i> Login Anggota (PWA)
                    </button>
                    <button 
                      onClick={() => onLogin(UserRole.ADMIN_KOPERASI)}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                    >
                      <i className="fas fa-user-tie text-sky-300"></i> Login Admin Desa
                    </button>
                    <button 
                      onClick={() => onLogin(UserRole.SUPER_ADMIN)}
                      className="w-full bg-slate-100 text-slate-400 py-4 rounded-2xl font-bold hover:bg-slate-200 hover:text-slate-600 transition-all flex items-center justify-center gap-3"
                    >
                      <i className="fas fa-shield-halved"></i> Super Admin (Pusat)
                    </button>
                  </>
               )}
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setAuthMode(authMode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
                className="text-sm font-bold text-slate-400 hover:text-sky-500 transition-colors"
              >
                {authMode === 'LOGIN' ? 'Belum punya akun? Daftar Sekarang' : 'Sudah punya akun? Login di sini'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
