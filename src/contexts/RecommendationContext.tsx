import React, { createContext, useContext, useEffect, useState } from 'react';
import { products } from '@/data/products';
import { useOrders } from './OrderContext';
import { useTryon } from './TryonContext';

interface RecommendationContextType {
  recommendations: any[];
  loading: boolean;
}

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export const RecommendationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { orders } = useOrders();
  const { history } = useTryon();

  useEffect(() => {
    // Simple recommendation logic based on orders and try-ons
    const getRecommendations = () => {
      setLoading(true);
      
      // Get product categories from orders and try-ons
      const orderedProducts = orders.flatMap(order => order.items.map(item => item.productId));
      const triedOnProducts = history.map(item => item.productId);
      
      // Combine and get unique product IDs
      const interactedProducts = [...new Set([...orderedProducts, ...triedOnProducts])];
      
      // Get categories of these products
      const interactedCategories = interactedProducts
        .map(id => products.find(p => p.id === id)?.category)
        .filter(Boolean);

      // Recommend products from similar categories
      const recommendations = products.filter(product => 
        interactedCategories.includes(product.category) && 
        !interactedProducts.includes(product.id)
      );

      setRecommendations(recommendations.slice(0, 8));
      setLoading(false);
    };

    getRecommendations();
  }, [orders, history]);

  return (
    <RecommendationContext.Provider value={{ recommendations, loading }}>
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendations = () => {
  const context = useContext(RecommendationContext);
  if (context === undefined) {
    throw new Error('useRecommendations must be used within a RecommendationProvider');
  }
  return context;
}; 