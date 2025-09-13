import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { CartItem } from './CartItem';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, total } = useCart();

  const cartItemsWithDetails = items.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  }));

  return (
    <div className="container px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItemsWithDetails.map(item => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="bg-background p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(total + 10).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 