
export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Purchase {
  id: string;
  customerId: string;
  customerEmail: string;
  items: PurchaseItem[];
  totalAmount: number;
  purchaseDate: string;
}
