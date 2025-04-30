
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from '../store/productStore';

const AddProductForm = () => {
  const { toast } = useToast();
  const { addProduct, isProductIdUnique } = useProductStore();
  
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [idError, setIdError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate product ID
    if (!isProductIdUnique(productId)) {
      setIdError('Product ID must be unique');
      return;
    }
    
    const parsedQuantity = parseInt(quantity, 10);
    const parsedPrice = parseFloat(price);
    
    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }
    
    // Add product
    addProduct({
      id: productId,
      name,
      quantity: parsedQuantity,
      price: parsedPrice
    });
    
    // Reset form
    setProductId('');
    setName('');
    setQuantity('');
    setPrice('');
    setIdError('');
    
    toast({
      title: "Product Added",
      description: `${name} has been added to inventory`,
    });
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductId(value);
    
    if (value && !isProductIdUnique(value)) {
      setIdError('Product ID must be unique');
    } else {
      setIdError('');
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productId">Product ID</Label>
            <Input
              id="productId"
              value={productId}
              onChange={handleIdChange}
              required
              className={idError ? "border-red-500" : ""}
            />
            {idError && <p className="text-sm text-red-500">{idError}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              min="0.01"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full">Add Product</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddProductForm;
