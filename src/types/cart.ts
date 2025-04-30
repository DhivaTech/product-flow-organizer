
import { Product } from './product';

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CartState {
  customerId: string;
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}
