import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export const OrderSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-green-500" />
        <h1 className="text-2xl font-bold mb-4">
          Thank You for Your Order!
        </h1>
        <p className="text-muted-foreground mb-8">
          Your order has been successfully placed. We'll send you an email with your order details
          and tracking information once your package ships.
        </p>
        <div className="space-y-4">
          <Button
            className="w-full"
            onClick={() => navigate('/orders')}
          >
            View Order
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}; 