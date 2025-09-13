import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PromotionalBanners = () => {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* First Promo Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/30 h-64 lg:h-80">
          <div className="absolute inset-0">
            <div className="absolute right-0 bottom-0 w-1/2 h-full">
              <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-orange-400/30 to-transparent"></div>
            </div>
          </div>
          
          <div className="relative h-full flex flex-col justify-center p-8">
            <div className="max-w-xs">
              <h3 className="text-xl font-bold mb-2">Summer Collection</h3>
              <p className="mb-4 text-muted-foreground">
                Get ready for warmer days with our new summer essentials.
              </p>
              <Button className="bg-amber-500 hover:bg-amber-600">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Second Promo Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/30 h-64 lg:h-80">
          <div className="absolute inset-0">
            <div className="absolute right-0 bottom-0 w-1/2 h-full">
              <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-indigo-400/30 to-transparent"></div>
            </div>
          </div>
          
          <div className="relative h-full flex flex-col justify-center p-8">
            <div className="max-w-xs">
              <h3 className="text-xl font-bold mb-2">Exclusive Members Only</h3>
              <p className="mb-4 text-muted-foreground">
                Join our membership program for early access to new arrivals and exclusive discounts.
              </p>
              <Button className="bg-indigo-500 hover:bg-indigo-600">
                Join Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;