
import { create } from 'zustand';
import { Purchase, PurchaseItem } from '../types/purchase';
import { v4 as uuidv4 } from 'uuid';
import { CartItem } from '../types/cart';

interface PurchaseStore {
  purchases: Purchase[];
  addPurchase: (customerEmail: string, customerId: string, items: CartItem[]) => Purchase;
  getPurchasesByCustomerId: (customerId: string) => Purchase[];
  getAllPurchases: () => Purchase[];
}

export const usePurchaseStore = create<PurchaseStore>((set, get) => ({
  // Sample purchase history data
  purchases: [
    {
      id: '1',
      customerId: 'c001',
      customerEmail: 'customer@example.com',
      items: [
        { productId: 'P001', productName: 'Laptop', quantity: 1, price: 999.99 },
        { productId: 'P003', productName: 'Headphones', quantity: 1, price: 149.99 }
      ],
      totalAmount: 1149.98,
      purchaseDate: '2025-04-28T14:35:22Z'
    },
    {
      id: '2',
      customerId: 'c002',
      customerEmail: 'emma@example.com',
      items: [
        { productId: 'P002', productName: 'Smartphone', quantity: 1, price: 699.99 }
      ],
      totalAmount: 699.99,
      purchaseDate: '2025-04-29T09:12:45Z'
    },
    {
      id: '3',
      customerId: 'c001',
      customerEmail: 'customer@example.com',
      items: [
        { productId: 'P007', productName: 'Tablet', quantity: 1, price: 399.99 }
      ],
      totalAmount: 399.99,
      purchaseDate: '2025-04-29T16:23:11Z'
    }
  ],
  
  addPurchase: (customerEmail, customerId, items) => {
    const purchase: Purchase = {
      id: uuidv4(),
      customerId,
      customerEmail,
      items: items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
      purchaseDate: new Date().toISOString()
    };
    
    set(state => ({
      purchases: [...state.purchases, purchase]
    }));
    
    return purchase;
  },
  
  getPurchasesByCustomerId: (customerId) => {
    return get().purchases.filter(purchase => purchase.customerId === customerId);
  },
  
  getAllPurchases: () => {
    return get().purchases;
  }
}));
