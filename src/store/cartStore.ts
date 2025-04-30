
import { create } from 'zustand';
import { toast } from "sonner";
import { CartItem, CartState } from '../types/cart';
import { Product } from '../types/product';

export const useCartStore = create<CartState>((set, get) => ({
  customerId: '',
  items: [],
  
  addToCart: (product: Product, quantity: number) => {
    if (quantity <= 0) {
      toast.error("Quantity must be positive");
      return;
    }
    
    set((state) => {
      const existingItemIndex = state.items.findIndex(item => item.productId === product.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast.success(`Updated ${product.name} quantity in cart`);
        return { items: updatedItems };
      } else {
        // Add new item
        const newItem: CartItem = {
          productId: product.id,
          productName: product.name,
          quantity,
          price: product.price
        };
        
        toast.success(`Added ${product.name} to cart`);
        return { items: [...state.items, newItem] };
      }
    });
  },
  
  removeFromCart: (productId: string) => {
    set((state) => ({
      items: state.items.filter(item => item.productId !== productId)
    }));
    toast.info("Item removed from cart");
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      get().removeFromCart(productId);
      return;
    }
    
    set((state) => ({
      items: state.items.map(item => 
        item.productId === productId 
          ? { ...item, quantity } 
          : item
      )
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
    toast.info("Cart cleared");
  },
  
  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.quantity * item.price), 0);
  }
}));

// Initialize customer ID when authenticated
export const initializeCart = (customerId: string) => {
  useCartStore.setState({ customerId });
};
