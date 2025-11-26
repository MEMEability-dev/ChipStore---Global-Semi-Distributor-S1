export type Language = 'en' | 'cn' | 'es' | 'de';

export type Theme = 'light' | 'dark';

export interface PricingTier {
  minQty: number;
  price: number;
}

export interface Part {
  id: string;
  mpn: string; // Manufacturer Part Number
  manufacturer: string;
  description: string;
  category: string;
  stock: number;
  price: number; // Base price for sorting
  currency: string;
  specs?: Record<string, string>; // Technical specifications
  pricingTiers?: PricingTier[];   // Volume pricing
  datasheetUrl?: string;
  status: 'In Stock' | 'Low Stock' | 'Obsolete' | 'Lead Time' | 'RFQ';
  rohs: boolean;
}

export interface SearchResult {
  query: string;
  hits: number;
  parts: Part[];
}

export interface NavItem {
  labelKey: string;
  href: string;
  icon?: string;
}

export type Translations = Record<string, Record<string, string>>;