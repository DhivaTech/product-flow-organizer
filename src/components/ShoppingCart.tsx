
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from '../store/cartStore';
import { Trash2, ShoppingCart as CartIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Product images mapping (same as in ProductsTable)
const productImages = {
  'Laptop': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
  'Smartphone': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
  'Headphones': 'https://images.unsplash.com/photo-1493962853295-0fd70327578a',
  'Monitor': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
  'Keyboard': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
  'Mouse': 'https://images.unsplash.com/photo-1493962853295-0fd70327578a',
  'Tablet': 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
  'Default': 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
};

const getProductImage = (productName) => {
  return productImages[productName] || productImages['Default'];
};

const ShoppingCart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCartStore();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }
    
    // For demo purposes, just clear cart and show success message
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. Your order has been placed."
    });
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <CartIcon className="h-5 w-5 text-blue-600" />
          <span>Your Cart</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        {items.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>
                    <img 
                      src={getProductImage(item.productName)} 
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 w-7 p-0"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 w-7 p-0"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 text-red-500"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <CartIcon className="h-12 w-12 text-gray-300" />
              <p>Your cart is empty</p>
              <p className="text-sm text-gray-400">Start shopping to add items to your cart</p>
            </div>
          </div>
        )}
      </CardContent>
      
      {items.length > 0 && (
        <CardFooter className="flex flex-col bg-slate-50 border-t p-4">
          <div className="flex justify-between w-full mb-4">
            <div className="font-semibold">Subtotal:</div>
            <div>${getTotal().toFixed(2)}</div>
          </div>
          <div className="flex justify-between w-full mb-4">
            <div className="font-semibold">Tax (10%):</div>
            <div>${(getTotal() * 0.1).toFixed(2)}</div>
          </div>
          <div className="flex justify-between w-full mb-6 text-lg font-bold">
            <div>Total:</div>
            <div>${(getTotal() * 1.1).toFixed(2)}</div>
          </div>
          <Button 
            onClick={handleCheckout} 
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            Proceed to Checkout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ShoppingCart;
