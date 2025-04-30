import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ArrowDown, ArrowUp, Search, Trash2, Plus, Edit, Save, X } from "lucide-react";
import { toast } from "sonner";
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../context/AuthContext';
import { getProductImage } from '../utils/productImages';

const ProductsTable = () => {
  const { products, searchTerm, setSearchTerm, updateProductQuantity, deleteProduct, lowStockThreshold, addProduct } = useProductStore();
  const { addToCart } = useCartStore();
  const { user } = useAuth();
  
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedValues, setEditedValues] = useState({
    id: '',
    name: '',
    price: 0
  });

  // Begin editing a product
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setEditedValues({
      id: product.id,
      name: product.name,
      price: product.price
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Save edited product
  const handleSaveEdit = (originalId) => {
    // First delete the original product
    deleteProduct(originalId);
    
    // Then add a new product with updated values but keep the original quantity
    const originalProduct = products.find(p => p.id === originalId);
    if (originalProduct) {
      const updatedProduct = {
        id: editedValues.id,
        name: editedValues.name,
        // Convert the price to a number before adding
        price: Number(editedValues.price),
        quantity: originalProduct.quantity
      };
      
      addProduct(updatedProduct);
      setEditingProduct(null);
      
      toast.success("Product Updated", {
        description: `${updatedProduct.name} has been updated successfully.`
      });
    }
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = [...products]
    .filter(product => 
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === 'price' || sortField === 'quantity') {
        return sortDirection === 'asc' 
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      } else {
        return sortDirection === 'asc'
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
    });

  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const newQuantity = product.quantity + change;
    const result = updateProductQuantity(id, newQuantity);
    
    if (!result) {
      toast.error("Quantity cannot be negative");
    }
  };

  // Handle delete
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      toast.success("Product Deleted", {
        description: `${name} has been removed from inventory`
      });
    }
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success("Added to Cart", {
      description: `${product.name} has been added to your cart.`
    });
  };

  const isCustomer = user?.role === 'customer';
  const isCashier = user?.role === 'cashier';

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Products Inventory</span>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('id')}
                >
                  ID {sortField === 'id' && (sortDirection === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />)}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  Name {sortField === 'name' && (sortDirection === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />)}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors text-right"
                  onClick={() => handleSort('quantity')}
                >
                  Quantity {sortField === 'quantity' && (sortDirection === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />)}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-100 transition-colors text-right"
                  onClick={() => handleSort('price')}
                >
                  Price {sortField === 'price' && (sortDirection === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />)}
                </TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={getProductImage(product.name)} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      {editingProduct === product.id ? (
                        <Input 
                          value={editedValues.id}
                          onChange={(e) => setEditedValues({...editedValues, id: e.target.value})}
                          className="w-32"
                        />
                      ) : (
                        product.id
                      )}
                    </TableCell>
                    <TableCell>
                      {editingProduct === product.id ? (
                        <Input 
                          value={editedValues.name}
                          onChange={(e) => setEditedValues({...editedValues, name: e.target.value})}
                          className="w-full"
                        />
                      ) : (
                        <>
                          {product.name}
                          {product.quantity < lowStockThreshold && (
                            <Badge variant="destructive" className="ml-2">
                              <AlertTriangle className="h-3 w-3 mr-1" /> Low Stock
                            </Badge>
                          )}
                        </>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{product.quantity}</TableCell>
                    <TableCell className="text-right">
                      {editingProduct === product.id ? (
                        <Input 
                          type="number"
                          value={editedValues.price}
                          onChange={(e) => setEditedValues({...editedValues, price: Number(e.target.value)})}
                          className="w-24 text-right ml-auto"
                        />
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center space-x-2">
                        {isCustomer ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={product.quantity <= 0}
                            onClick={() => handleAddToCart(product)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Cart
                          </Button>
                        ) : isCashier ? (
                          editingProduct === product.id ? (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleSaveEdit(product.id)}
                                className="bg-green-50 hover:bg-green-100 text-green-700"
                              >
                                <Save className="h-4 w-4 mr-1" /> Save
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={handleCancelEdit}
                                className="bg-gray-50 hover:bg-gray-100"
                              >
                                <X className="h-4 w-4 mr-1" /> Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleQuantityChange(product.id, -1)}
                              >
                                -
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleQuantityChange(product.id, 1)}
                              >
                                +
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEdit(product)}
                                className="bg-blue-50 hover:bg-blue-100 text-blue-700"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </>
                          )
                        ) : (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleQuantityChange(product.id, -1)}
                            >
                              -
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleQuantityChange(product.id, 1)}
                            >
                              +
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete(product.id, product.name)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsTable;
