import React, { createContext, useContext, useState, useEffect } from 'react';

interface TryonItem {
  id: string;
  productId: number;
  resultImage: string;
  createdAt: string;
  product: any;
}

interface TryonContextType {
  history: TryonItem[];
  addToHistory: (productId: number, resultImage: string, product: any) => void;
  getHistory: () => TryonItem[];
}

const TryonContext = createContext<TryonContextType | undefined>(undefined);

export const TryonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<TryonItem[]>(() => {
    const stored = localStorage.getItem('tryon-history');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('tryon-history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (productId: number, resultImage: string, product: any) => {
    const newTryon: TryonItem = {
      id: Math.random().toString(36).substr(2, 9),
      productId,
      resultImage,
      product,
      createdAt: new Date().toISOString()
    };
    setHistory(prev => [newTryon, ...prev]);
  };

  const getHistory = () => history;

  return (
    <TryonContext.Provider value={{ history, addToHistory, getHistory }}>
      {children}
    </TryonContext.Provider>
  );
};

export const useTryon = () => {
  const context = useContext(TryonContext);
  if (context === undefined) {
    throw new Error('useTryon must be used within a TryonProvider');
  }
  return context;
}; 