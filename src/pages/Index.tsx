
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AddProductForm from '../components/AddProductForm';
import ProductsTable from '../components/ProductsTable';
import StockSummary from '../components/StockSummary';
import LowStockAlert from '../components/LowStockAlert';
import ShoppingCart from '../components/ShoppingCart';
import PurchaseHistory from '../components/PurchaseHistory';
import CustomerWelcome from '../components/CustomerWelcome';
import { useAuth } from '../context/AuthContext';
import { initializeCart } from '../store/cartStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Initialize cart with customer ID when customer logs in
  useEffect(() => {
    if (user && user.role === 'customer') {
      initializeCart(user.id);
    }
  }, [user]);

  const isCustomer = user?.role === 'customer';
  const isOwnerOrCashier = user?.role === 'owner' || user?.role === 'cashier';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto p-4 md:p-6">
        {isOwnerOrCashier && (
          <Tabs defaultValue="inventory" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inventory" className="space-y-6">
              <StockSummary />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <ProductsTable />
                  </div>
                  <div>
                    <LowStockAlert />
                  </div>
                </div>
                <div>
                  <AddProductForm />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="purchases">
              <PurchaseHistory />
            </TabsContent>
          </Tabs>
        )}
        
        {isCustomer && (
          <div className="space-y-6">
            <CustomerWelcome />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProductsTable />
              </div>
              <div>
                <ShoppingCart />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
