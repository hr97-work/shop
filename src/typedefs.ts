export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
  brand?: string;
  quantity?: number;
}

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export interface CartIconButtonProps {
  onClick: () => void;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps {
  products: Product[];
}

export interface SortOrder {
  title: "asc" | "desc";
  price: "asc" | "desc";
}

export interface FilterApplyProps {
  range: number | number[];
  withBrand: boolean;
}

export interface SidebarProps {
  onFiltersApply: ({ range, withBrand }: FilterApplyProps) => void;
  availablePriceRange: number[];
  filters: FilterApplyProps;
}

export interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotal: () => string;
  getTotalQuantity: () => number;
  drawerOpen: boolean;
  toggleDrawer: (value: boolean) => void;
  emptyCart: () => void;
}

export interface ProductPageProps {
  product: Product;
}

export interface QueryFilters {
  sortByTitle: "asc" | "desc";
  sortByPrice: "asc" | "desc";
  priceRange: string;
  brand: string;
}
