
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN_KOPERASI = 'ADMIN_KOPERASI',
  ANGGOTA = 'ANGGOTA'
}

export interface VillageCooperative {
  id: string;
  name: string;
  adminName: string;
  memberCount: number;
  totalAssets: number;
  totalSavings: number;
  totalLoans: number;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  lastAudit: string;
  location: string;
}

export interface Member {
  id: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  joinDate: string;
  totalSavings: number;
  totalLoans: number;
  monthlyDues: 'PAID' | 'UNPAID';
  shuAllocated: number;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  village: string;
  avatar: string;
  balance: number;
  savings: number;
  loan: number;
  shu: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image: string;
  isSubsidy?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  warehouse: string;
  lastUpdated: string;
}

export interface AccountingEntry {
  category: string;
  amount: number;
  trend: number;
}
