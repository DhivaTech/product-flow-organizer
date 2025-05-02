
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '../context/AuthContext';
import { useProductStore } from '../store/productStore';
import { usePurchaseStore } from '../store/purchaseStore';
import { getProductSuggestions, getProductImage } from '../utils/productImages';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';
import { toast } from 'sonner';

const CustomerWelcome = () => {
  const { user } = useAuth();
  const { products } = useProductStore();
  const { getPurchasesByCustomerId } = usePurchaseStore();
  const { addToCart } = useCartStore();
  
  // Get customer purchase history
  const customerPurchases = user ? getPurchasesByCustomerId(user.id) : [];
  
  // Get product suggestions
  const suggestedProducts = getProductSuggestions(customerPurchases, products);
  
  // Add to cart handler
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success("Added to Cart", {
      description: `${product.name} has been added to your cart.`
    });
  };
  
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  // Get display name - either the user's actual name or the part before @ in email
  const getDisplayName = () => {
    if (!user) return '';
    
    // Use name if available, otherwise extract from email
    if (user.name) {
      return user.name;
    } else {
      return user.email.split('@')[0];
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="shadow-sm bg-blue-50">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold text-blue-800">{greeting()}, {getDisplayName()}!</h2>
          <p className="text-blue-600 mt-2">Welcome to our online store. We hope you find everything you need today.</p>
        </CardContent>
      </Card>
      
      {suggestedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended for you</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestedProducts.map(product => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={getProductImage(product.name)} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerWelcome;
