import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/data/products';

interface CartItemProps {
  item: {
    productId: number;
    quantity: number;
    size: string;
    product: Product;
  };
}

export const CartItem = ({ item }: CartItemProps) => {
  const [loading, setLoading] = useState(false);
  const { updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setLoading(true);
    try {
      updateQuantity(item.productId, newQuantity);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      removeFromCart(item.productId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="w-24 h-24 overflow-hidden rounded-md">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
        <p className="font-bold mt-1">${item.product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            disabled={loading}
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            disabled={loading}
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            disabled={loading}
            onClick={handleRemove}
            className="ml-4"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}; 