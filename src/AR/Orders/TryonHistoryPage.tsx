import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTryon } from '@/contexts/TryonContext';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';

export const TryonHistoryPage = () => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedTryon, setSelectedTryon] = useState<any>(null);
  const navigate = useNavigate();
  const { history } = useTryon();
  const { addToCart } = useCart();

  const handleShare = (tryon: any) => {
    setSelectedTryon(tryon);
    setShareDialogOpen(true);
  };

  const shareToSocial = async (platform: 'twitter' | 'facebook' | 'instagram') => {
    const shareUrl = `${window.location.origin}/shared-tryon/${selectedTryon.id}`;
    const text = "Check out how this outfit looks on me using ARdrobe's virtual try-on!";

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'instagram':
        // Since Instagram doesn't have a direct share URL, we'll copy the link to clipboard
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied! You can now paste it on Instagram.');
        break;
    }
    setShareDialogOpen(false);
  };

  const handleTryAgain = (productId: number) => {
    navigate(`/tryon/${productId}`);
  };

  return (
    <div className="container px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Try-On History</h1>
      {history.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            You haven't tried on any clothes yet
          </p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item: any) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-20 relative">
                {/* <img
                  src={item.resultImage}
                  alt="Try-on result"
                  className="w-full h-full object-cover"
                /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    Tried on {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleTryAgain(item.product.id)}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare(item)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => addToCart({
                      productId: item.product.id,
                      quantity: 1
                    })}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share your try-on</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              variant="outline"
              onClick={() => shareToSocial('twitter')}
              className="flex items-center gap-2"
            >
              Share on Twitter
            </Button>
            <Button
              variant="outline"
              onClick={() => shareToSocial('facebook')}
              className="flex items-center gap-2"
            >
              Share on Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => shareToSocial('instagram')}
              className="flex items-center gap-2"
            >
              Share on Instagram
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 