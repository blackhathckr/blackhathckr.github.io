import { useRecommendations } from '@/contexts/RecommendationContext';
import { ProductCard } from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const RecommendationSection = () => {
  const { recommendations, loading } = useRecommendations();
  
  if (loading) {
    return (
      <div className="container px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="container px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
        <p className="text-muted-foreground text-center">
          Try on some items or make purchases to get personalized recommendations!
        </p>
      </div>
    );
  }

  return (
    <div className="container px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {recommendations.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/3 lg:basis-1/4 pl-4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}; 