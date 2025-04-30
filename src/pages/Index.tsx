
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import AddProductForm from '../components/AddProductForm';
import ProductsTable from '../components/ProductsTable';
import StockSummary from '../components/StockSummary';
import LowStockAlert from '../components/LowStockAlert';
import ShoppingCart from '../components/ShoppingCart';
import { useAuth } from '../context/AuthContext';
import { initializeCart } from '../store/cartStore';

const Index = () => {
  const { user } = useAuth();
  
  // Initialize cart with customer ID when customer logs in
  useEffect(() => {
    if (user && user.role === 'customer') {
      initializeCart(user.id);
    }
  }, [user]);

  const isCustomer = user?.role === 'customer';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <StockSummary />
        </div>
        
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
            {isCustomer ? (
              <ShoppingCart />
            ) : (
              <AddProductForm />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
