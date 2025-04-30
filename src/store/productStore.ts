
import { create } from 'zustand';
import { Product } from '../types/product';

interface ProductStore {
  products: Product[];
  searchTerm: string;
  lowStockThreshold: number;
  addProduct: (product: Product) => void;
  updateProductQuantity: (id: string, newQuantity: number) => boolean;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => boolean;
  deleteProduct: (id: string) => void;
  setSearchTerm: (term: string) => void;
  isProductIdUnique: (id: string, excludeId?: string) => boolean;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [
    { id: 'P001', name: 'Laptop', quantity: 10, price: 999.99 },
    { id: 'P002', name: 'Smartphone', quantity: 15, price: 699.99 },
    { id: 'P003', name: 'Headphones', quantity: 25, price: 149.99 },
    { id: 'P004', name: 'Monitor', quantity: 8, price: 299.99 },
    { id: 'P005', name: 'Keyboard', quantity: 4, price: 89.99 },
    { id: 'P006', name: 'Mouse', quantity: 3, price: 49.99 },
    { id: 'P007', name: 'Tablet', quantity: 12, price: 399.99 },
  ],
  searchTerm: '',
  lowStockThreshold: 5,
  
  addProduct: (product: Product) =>
    set((state) => ({
      products: [...state.products, product]
    })),
    
  updateProductQuantity: (id: string, newQuantity: number) => {
    const product = get().products.find(p => p.id === id);
    
    if (!product || newQuantity < 0) {
      return false;
    }
    
    set((state) => ({
      products: state.products.map(p => 
        p.id === id ? { ...p, quantity: newQuantity } : p
      )
    }));
    
    return true;
  },

  updateProduct: (id: string, updatedProduct: Partial<Product>) => {
    const product = get().products.find(p => p.id === id);
    
    if (!product) {
      return false;
    }
    
    set((state) => ({
      products: state.products.map(p => 
        p.id === id ? { ...p, ...updatedProduct } : p
      )
    }));
    
    return true;
  },
  
  deleteProduct: (id: string) =>
    set((state) => ({
      products: state.products.filter(p => p.id !== id)
    })),
    
  setSearchTerm: (term: string) =>
    set({ searchTerm: term }),
    
  isProductIdUnique: (id: string, excludeId?: string) =>
    !get().products.some(p => p.id === id && p.id !== excludeId)
}));
