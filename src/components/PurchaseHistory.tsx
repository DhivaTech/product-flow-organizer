
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePurchaseStore } from '../store/purchaseStore';
import { formatDistanceToNow } from 'date-fns';

const PurchaseHistory = () => {
  const { getAllPurchases } = usePurchaseStore();
  const purchases = getAllPurchases();
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        {purchases.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase) => {
                const totalItems = purchase.items.reduce((sum, item) => sum + item.quantity, 0);
                const purchaseDate = new Date(purchase.purchaseDate);
                
                return (
                  <TableRow key={purchase.id}>
                    <TableCell>{purchase.customerEmail}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        {purchase.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.productName} x {item.quantity}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{totalItems}</TableCell>
                    <TableCell className="text-right">${purchase.totalAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <div className="text-sm">{formatDistanceToNow(purchaseDate, { addSuffix: true })}</div>
                      <div className="text-xs text-gray-500">
                        {purchaseDate.toLocaleDateString()} {purchaseDate.toLocaleTimeString()}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="py-8 text-center text-gray-500">No purchase history found</div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchaseHistory;
