
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';
import { useProductStore } from '../store/productStore';

const LowStockAlert = () => {
  const { products, lowStockThreshold } = useProductStore();
  
  const lowStockProducts = products.filter(product => product.quantity < lowStockThreshold);
  
  if (lowStockProducts.length === 0) {
    return null;
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-700 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Low Stock Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {lowStockProducts.map(product => (
            <li key={product.id} className="flex justify-between">
              <div>
                <span className="font-medium">{product.name}</span> 
                <span className="text-gray-600 text-sm"> (ID: {product.id})</span>
              </div>
              <span className="text-amber-800 font-medium">
                {product.quantity} left
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LowStockAlert;
