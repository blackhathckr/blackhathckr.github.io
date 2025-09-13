import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { ShippingForm } from './ShippingForm';
import { products } from '@/data/products';

export const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { createOrder } = useOrders();

  const cartItemsWithDetails = items.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  }));

  const handlePlaceOrder = async (shippingDetails: any) => {
    setLoading(true);
    try {
      // Create order with shipping details and cart items
      await createOrder({
        items: cartItemsWithDetails,
        total: total + 10, // Including shipping
        status: 'pending',
        createdAt: new Date().toISOString(),
        shippingDetails
      });
      
      // Clear cart
      clearCart();
      
      // Navigate to success page
      navigate('/order-success');
    } catch (error) {
      console.error('Order placement failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <div className="p-6">
                <ShippingForm
                  onSubmit={handlePlaceOrder}
                  loading={loading}
                />
              </div>
            </Card>
          </div>
          
          <div>
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {cartItemsWithDetails.map(item => (
                    <div key={item.productId} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${(item.quantity * item.product.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Shipping</span>
                      <span>$10.00</span>
                    </div>
                    <div className="flex justify-between mt-2 font-bold">
                      <span>Total</span>
                      <span>${(total + 10).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}; 