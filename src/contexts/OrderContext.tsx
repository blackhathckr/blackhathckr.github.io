import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '@/data/products';

interface OrderItem {
  productId: number;
  quantity: number;
  size: string;
  product: any; // Include the full product details
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingDetails: any;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id'>) => Promise<void>;
  getOrderHistory: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    // Initialize from localStorage
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = async (orderData: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      ...orderData
    };

    setOrders(prev => [...prev, newOrder]);
  };

  const getOrderHistory = () => {
    return orders;
  };

  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrderHistory }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}; 