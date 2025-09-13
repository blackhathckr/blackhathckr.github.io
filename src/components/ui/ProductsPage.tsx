import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { products } from '@/data/products';
import { AR } from '@/AR/core/BodyTracking/PoseEstimation/SkeletonMapping/TrackingConstants';

const ProductsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [loading, setLoading] = useState(false);

  const handleTryOn = async (product) => {
    if (!product.arConfig?.uid) return;

    setLoading(true);
    try {
      const url = atob(AR[product.arConfig.uid]);
      window.location.href = url;
    } catch (error) {
      console.error('AR initialization failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1, 'ONE_SIZE');
  };

  const toggleWishlist = (productId: number) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <div className="container mx-auto py-8 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group">
            <div className="relative h-48 bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover fill"
              />
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 ${
                  isInWishlist(product.id) ? 'text-red-500' : ''
                }`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart className="h-5 w-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </Button>
            </div>
            <CardContent className="p-4">
              <CardTitle className="mb-2">{product.name}</CardTitle>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="font-semibold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleTryOn(product)}
                disabled={loading}
              >
                {loading ? 'Initializing AR...' : 'Try On'}
              </Button>
              <Button 
                className="flex-1"
                onClick={() => handleAddToCart(product.id)}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;