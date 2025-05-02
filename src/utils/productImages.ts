
import { User } from '../types/auth';

// Map product names to appropriate images
const productImageMap: Record<string, string> = {
  'Laptop': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
  'laptop': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
  'Smartphone': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
  'smartphone': 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
  'Headphones': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
  'headphones': 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
  'Monitor': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'monitor': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'Keyboard': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
  'keyboard': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
  'Mouse': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
  'mouse': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
  'Tablet': 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c',
  'tablet': 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c',
};

// Generate initials for products without specific images
const generateInitialsImage = (productName: string): string => {
  const initial = productName.charAt(0).toUpperCase();
  // Generate a random pastel color background
  const hue = Math.floor(Math.random() * 360);
  const bgColor = `hsl(${hue}, 70%, 80%)`;
  
  // Create SVG with initial
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="${bgColor}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="100" font-weight="bold" fill="#FFFFFF">${initial}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Get product image based on name
export const getProductImage = (productName: string): string => {
  const lowerName = productName.toLowerCase();
  
  // Check if we have a predefined image for this product
  for (const [key, url] of Object.entries(productImageMap)) {
    if (lowerName.includes(key.toLowerCase())) {
      return url;
    }
  }
  
  // If no match, generate an image with first letter
  return generateInitialsImage(productName);
};

// Get product suggestions based on customer's purchase history
export const getProductSuggestions = (purchases: any[], products: any[]): any[] => {
  if (!purchases || purchases.length === 0) {
    // If no purchase history, return some popular products
    return products
      .filter(p => p.quantity > 0)
      .slice(0, 3);
  }
  
  // Get all purchased product categories
  const purchasedProductNames = purchases.flatMap(p => 
    p.items.map(item => item.productName.toLowerCase())
  );
  
  // Find products that are similar to what customer purchased
  return products
    .filter(product => {
      // Don't suggest products they already bought
      if (purchasedProductNames.includes(product.name.toLowerCase())) {
        return false;
      }
      
      // Check if this product is related to any purchase
      return purchasedProductNames.some(name => {
        const productCategory = getProductCategory(product.name.toLowerCase());
        const purchasedCategory = getProductCategory(name);
        return productCategory === purchasedCategory;
      });
    })
    .filter(p => p.quantity > 0) // Only suggest products in stock
    .slice(0, 3); // Limit to 3 suggestions
};

// Helper to determine product category
const getProductCategory = (name: string): string => {
  if (name.includes('laptop') || name.includes('computer')) return 'computers';
  if (name.includes('phone') || name.includes('smartphone')) return 'phones';
  if (name.includes('tablet')) return 'tablets';
  if (name.includes('headphone') || name.includes('earphone') || name.includes('audio')) return 'audio';
  if (name.includes('monitor') || name.includes('display')) return 'displays';
  if (name.includes('keyboard') || name.includes('mouse') || name.includes('accessory')) return 'accessories';
  return 'other';
};
