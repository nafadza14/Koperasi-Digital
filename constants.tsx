
import { UserRole, Product, InventoryItem, VillageCooperative, Member } from './types';

export const COLORS = {
  primary: '#89CFF0', // Baby Blue
  secondary: '#FF6B6B',
  accent: '#74b9ff',
  bg: '#f8fafc',
  text: '#2d3436'
};

export const MOCK_USER: Record<UserRole, any> = {
  [UserRole.SUPER_ADMIN]: {
    id: 'SA-CENTRAL-01',
    name: 'Ir. H. Syarifuddin',
    role: UserRole.SUPER_ADMIN,
    village: 'Pusat Nasional (Jakarta)',
    avatar: 'https://i.pravatar.cc/150?u=syarif'
  },
  [UserRole.ADMIN_KOPERASI]: {
    id: 'AD-MP-042',
    name: 'Siti Aminah',
    role: UserRole.ADMIN_KOPERASI,
    village: 'Desa Merah Putih',
    avatar: 'https://i.pravatar.cc/150?u=siti'
  },
  [UserRole.ANGGOTA]: {
    id: 'MB-777-AGUS',
    name: 'Agus Pratama',
    role: UserRole.ANGGOTA,
    village: 'Desa Merah Putih',
    avatar: 'https://i.pravatar.cc/150?u=agus',
    balance: 750000,
    savings: 5000000,
    loan: 2000000,
    shu: 845000
  }
};

// Generate 200 Dummy Members for Village Admin
export const MOCK_MEMBERS: Member[] = Array.from({ length: 200 }).map((_, i) => ({
  id: `MB-${1000 + i}`,
  name: [
    'Bambang', 'Siti', 'Eko', 'Dewi', 'Rudi', 'Ani', 'Budi', 'Lestari', 'Agus', 'Harti',
    'Joko', 'Sri', 'Hadi', 'Maya', 'Tono', 'Rina', 'Saputra', 'Indah', 'Wawan', 'Santi'
  ][i % 20] + ' ' + ['Wijaya', 'Susanto', 'Pratama', 'Kusuma', 'Hidayat'][i % 5],
  status: Math.random() > 0.1 ? 'ACTIVE' : 'INACTIVE',
  joinDate: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-15`,
  totalSavings: Math.floor(Math.random() * 10000000) + 500000,
  totalLoans: Math.random() > 0.7 ? Math.floor(Math.random() * 5000000) : 0,
  monthlyDues: Math.random() > 0.2 ? 'PAID' : 'UNPAID',
  shuAllocated: Math.floor(Math.random() * 500000) + 50000,
  avatar: `https://i.pravatar.cc/150?u=mb${i}`
}));

// Generate 24 Dummy Village Cooperatives
const VILLAGE_NAMES = [
  'Merah Putih', 'Sukamaju', 'Jayapura', 'Tepus', 'Mulyosari', 'Beringin', 
  'Cisadane', 'Gunung Sari', 'Suka Damai', 'Mekar Wangi', 'Sari Bumi', 'Wonoayu',
  'Pandanwangi', 'Sidomulyo', 'Gajah Mada', 'Sumber Arta', 'Batu Karang', 'Pesisir Indah',
  'Bukit Tinggi', 'Lembah Hijau', 'Suryakencana', 'Majapahit', 'Sriwijaya', 'Kartasura'
];

export const MOCK_VILLAGES: VillageCooperative[] = VILLAGE_NAMES.map((name, i) => ({
  id: `VIL-${100 + i}`,
  name: `Koperasi Desa ${name}`,
  adminName: `Admin ${name}`,
  memberCount: Math.floor(Math.random() * 2000) + 500,
  totalAssets: Math.floor(Math.random() * 5000000000) + 1000000000,
  totalSavings: Math.floor(Math.random() * 2000000000) + 500000000,
  totalLoans: Math.floor(Math.random() * 1000000000) + 100000000,
  status: Math.random() > 0.1 ? 'ACTIVE' : 'INACTIVE',
  lastAudit: '2023-11-15',
  location: `Kec. Wilayah ${String.fromCharCode(65 + (i % 5))}`
}));

export const CATEGORIES = [
  { id: '1', name: 'Pupuk Subsidi', icon: 'fa-seedling' },
  { id: '2', name: 'Sembako', icon: 'fa-bowl-rice' },
  { id: '3', name: 'Peralatan Tani', icon: 'fa-tractor' },
  { id: '4', name: 'Kebutuhan Harian', icon: 'fa-basket-shopping' },
  { id: '5', name: 'PPOB', icon: 'fa-bolt' }
];

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 'p1', 
    name: 'Pupuk Urea Bersubsidi', 
    category: 'Pupuk Subsidi', 
    price: 112500, 
    originalPrice: 225000, 
    stock: 450, 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs6W57FpDxeMxa0vUpJUc-DqIhKG-y9ongTw&s', 
    isSubsidy: true 
  },
  { 
    id: 'p2', 
    name: 'Beras SPHP 5kg', 
    category: 'Sembako', 
    price: 54000, 
    originalPrice: 65000,
    stock: 120, 
    image: 'https://smb-padiumkm-images-public-prod.oss-ap-southeast-5.aliyuncs.com/product/image/20072025/6879ffdcce99351cdacb427e/687cbe5f384ee98dfef9de6d/50de8a5869ab7008803bead3f76bf0.jpeg?x-oss-process=image/resize,m_pad,w_432,h_432/quality,Q_70' 
  },
  { 
    id: 'p3', 
    name: 'Minyak Goreng MinyakKita', 
    category: 'Sembako', 
    price: 15700, 
    stock: 85, 
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsAZZ-pksK_KRNcinEatNmDXjHBiRoMJ24w&s' 
  },
  { 
    id: 'p4', 
    name: 'Gula Pasir Curah 1Kg', 
    category: 'Sembako', 
    price: 17500, 
    stock: 200, 
    image: 'https://cdn.ralali.id/assets/img/Libraries/GULA-PASIR-CURAH-PACK-1-KG_PYGK39SOOVgZbq96_1561691560.jpg' 
  },
  { 
    id: 'p5', 
    name: 'Sabun Cuci Piring Ekonomi', 
    category: 'Kebutuhan Harian', 
    price: 12500, 
    stock: 300, 
    image: 'https://ik.imagekit.io/dcjlghyytp1/c126304502f8a51e858e10ce1109c42a?tr=f-auto,w-360' 
  },
  { 
    id: 'p6', 
    name: 'Pestisida Cair Organik', 
    category: 'Pupuk Subsidi', 
    price: 35000, 
    stock: 45, 
    image: 'https://bibitbunga.com/wp-content/uploads/2021/11/rug-1635905305278-1.jpeg.jpg' 
  },
  { 
    id: 'p7', 
    name: 'Garam Kapal 500 gr', 
    category: 'Sembako', 
    price: 4500, 
    stock: 150, 
    image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-28327118/no-brand_no-brand_full01.jpg' 
  },
  { 
    id: 'p8', 
    name: 'Tepung Krispi Mama Suka 900gr', 
    category: 'Sembako', 
    price: 18500, 
    stock: 75, 
    image: 'https://arti-assets.sgp1.cdn.digitaloceanspaces.com/megaswalayan/products/a01250f8-df42-43e9-b811-5cadd69c382f.jpg' 
  },
  { 
    id: 'p9', 
    name: 'Kecap Bango 950 gr', 
    category: 'Sembako', 
    price: 32000, 
    stock: 40, 
    image: 'https://image.astronauts.cloud/product-images/2024/10/45_ffbd04ac-3b05-4c1c-bf19-e9b3237aab63_900x900.jpg' 
  },
  { 
    id: 'p10', 
    name: 'Cangkul Baja Anti Karat', 
    category: 'Peralatan Tani', 
    price: 85000, 
    stock: 25, 
    image: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?q=80&w=800&auto=format&fit=crop' 
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'Pupuk Urea', sku: 'FERT-UREA-01', quantity: 450, minQuantity: 100, warehouse: 'Gudang Timur', lastUpdated: '2023-10-25' },
  { id: 'i2', name: 'Beras SPHP', sku: 'FOOD-RICE-SPHP', quantity: 120, minQuantity: 50, warehouse: 'Gudang Barat', lastUpdated: '2023-10-24' },
  { id: 'i3', name: 'Pestisida Cair', sku: 'CHEM-PEST-03', quantity: 15, minQuantity: 20, warehouse: 'Gudang Timur', lastUpdated: '2023-10-25' }
];
