
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCartStore } from '../store/cartStore';
import { Trash2, ShoppingCart } from 'lucide-react';

const ShoppingCart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCartStore();
  
  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }
    
    // For demo purposes, just clear cart and show success message
    clearCart();
    alert('Thank you for your purchase! In a real app, this would process the payment and create an order.');
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span>Your Cart</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {items.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
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
                      <span>{item.quantity}</span>
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
            Your cart is empty
          </div>
        )}
      </CardContent>
      
      {items.length > 0 && (
        <CardFooter className="flex justify-between">
          <div className="font-semibold">Total: ${getTotal().toFixed(2)}</div>
          <Button onClick={handleCheckout}>
            Checkout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ShoppingCart;
