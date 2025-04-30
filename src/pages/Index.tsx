
import React from 'react';
import Navbar from '../components/Navbar';
import AddProductForm from '../components/AddProductForm';
import ProductsTable from '../components/ProductsTable';
import StockSummary from '../components/StockSummary';
import LowStockAlert from '../components/LowStockAlert';

const Index = () => {
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
            <AddProductForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
