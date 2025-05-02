
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import { useProductStore } from '../store/productStore';

const PrintInventory = () => {
  const { products, lowStockThreshold } = useProductStore();
  
  const printInventory = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Unable to open print window. Please check your popup settings.");
      return;
    }
    
    // Current date formatting
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    
    // Sort products by ID
    const sortedProducts = [...products].sort((a, b) => a.id.localeCompare(b.id));
    
    // Generate HTML content
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Inventory Status Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.5;
          }
          h1, h2 {
            color: #333;
          }
          .header {
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ccc;
          }
          .date {
            color: #666;
            font-size: 14px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            padding: 8px 12px;
            border: 1px solid #ddd;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .low-stock {
            background-color: #fff0f0;
            color: #d32f2f;
          }
          .summary {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #ccc;
          }
          @media print {
            button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Inventory Status Report</h1>
          <div class="date">Generated on: ${formattedDate} at ${formattedTime}</div>
        </div>
        
        <h2>Current Inventory</h2>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${sortedProducts.map(product => `
              <tr ${product.quantity < lowStockThreshold ? 'class="low-stock"' : ''}>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.quantity < lowStockThreshold ? 'LOW STOCK' : 'In Stock'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="summary">
          <h2>Inventory Summary</h2>
          <p>
            <strong>Total Products:</strong> ${products.length}<br>
            <strong>Total Items:</strong> ${products.reduce((sum, p) => sum + p.quantity, 0)}<br>
            <strong>Low Stock Items:</strong> ${products.filter(p => p.quantity < lowStockThreshold).length}<br>
            <strong>Total Inventory Value:</strong> $${products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2)}
          </p>
        </div>
        
        <button onclick="window.print(); window.close();" style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">
          Print Report
        </button>
      </body>
      </html>
    `;
    
    // Write HTML to the new window and trigger print
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    
    toast.success("Print preview ready", {
      description: "The inventory report has been prepared for printing"
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Print Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={printInventory}
          className="w-full"
          variant="outline"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print Inventory Status
        </Button>
      </CardContent>
    </Card>
  );
};

export default PrintInventory;
