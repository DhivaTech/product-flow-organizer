
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from '../store/productStore';

const StockSummary = () => {
  const { products, lowStockThreshold } = useProductStore();
  
  const totalProducts = products.length;
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const lowStockItems = products.filter(product => product.quantity < lowStockThreshold).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalItems}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Inventory Value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
        </CardContent>
      </Card>
      
      <Card className={lowStockItems > 0 ? "border-red-200 bg-red-50" : ""}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-sm font-medium ${lowStockItems > 0 ? "text-red-500" : "text-gray-500"}`}>
            Low Stock Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${lowStockItems > 0 ? "text-red-600" : ""}`}>{lowStockItems}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockSummary;
