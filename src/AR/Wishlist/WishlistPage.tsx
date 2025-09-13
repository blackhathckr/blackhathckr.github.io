import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';

export const WishlistPage = () => {
  const navigate = useNavigate();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistItems = items.map(productId => ({
    productId,
    product: products.find(p => p.id === productId)!
  }));

  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1, 'M'); // Default size M
  };

  const handleTryOn = (productId: number) => {
    navigate(`/try-on/${productId}`);
  };

  return (
    <div className="container px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map(({ productId, product }) => (
            <Card key={productId} className="group">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removeFromWishlist(productId)}
                >
                  <Heart className="h-4 w-4" fill="currentColor" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleTryOn(productId)}
                  >
                    Try On
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleAddToCart(productId)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}; 