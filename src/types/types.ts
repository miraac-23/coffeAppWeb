import { Coffe } from "./coffeeTypes";


export interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export interface CoffeeDetailModalProps extends ModalProps {
  coffee: Coffe | null;
}

export interface CoffeeCardProps {
  coffee: Coffe;
  onClick: () => void;
  variant?: 'default' | 'featured';
}

export interface OrderPageProps {
  coffeeId: number;
}

export interface LoadingProgressProps {
  coffeeName: string;
  progress?: number;
}

export interface OrderCompleteProps {
  coffee: Coffe;
  onBackClick?: () => void;
}

export interface HeroSectionProps {
  onCoffeeDetailClick: () => void;
  onOrderClick: () => void;
  title?: string;
  subtitle?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: number[];
}

export interface OrderHistory {
  id: string;
  coffeeId: number;
  date: Date;
  price: number;
  status: 'preparing' | 'ready' | 'delivered';
}

export interface CoffeeFilterOptions {
  minPrice?: number;
  maxPrice?: number;
  strength?: number[];
  searchTerm?: string;
  sortBy?: 'price' | 'rating' | 'strength';
}