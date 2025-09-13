import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Eye, Star } from "lucide-react";
import oversizedtshirt from "@/assets/landing-page/best-sellers/oversized-tshirt.jpg";
import slimfitdenim from "@/assets/landing-page/best-sellers/slimfit-denim.jpg";
import athleticsneakers from "@/assets/landing-page/best-sellers/athletic-sneakers.jpeg";
import woolblendcardigan from "@/assets/landing-page/best-sellers/woolblend-cardigan.jpeg";
import smartcasualblazer from "@/assets/landing-page/best-sellers/smartcasual-blazer.jpg";
import cottonshorts from "@/assets/landing-page/best-sellers/cotton-shorts.jpg";

const products = [
  {
    id: 1,
    name: "Oversized Cotton Tee",
    price: 39.99,
    rating: 4.5,
    reviews: 128,
    image: oversizedtshirt,
    isNew: true,
    discount: null,
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviews: 87,
    image: slimfitdenim,
    isNew: false,
    discount: 30,
  },
  {
    id: 3,
    name: "Athletic Sneakers",
    price: 79.99,
    rating: 4.2,
    reviews: 64,
    image: athleticsneakers,
    isNew: true,
    discount: null,
  },
  {
    id: 4,
    name: "Wool Blend Cardigan",
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 42,
    image: woolblendcardigan,
    isNew: false,
    discount: 30,
  },
  {
    id: 5,
    name: "Smart Casual Blazer",
    price: 129.99,
    rating: 4.7,
    reviews: 35,
    image: smartcasualblazer,
    isNew: false,
    discount: null,
  },
  {
    id: 6,
    name: "Cotton Chino Shorts",
    price: 49.99,
    rating: 4.3,
    reviews: 56,
    image: cottonshorts,
    isNew: false,
    discount: null,
  },
];

const ProductCarousel = ({ title = "Best Sellers" }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const nextItems = () => {
    setStartIndex((prevIndex) =>
      (prevIndex + itemsPerPage) % products.length
    );
  };

  const prevItems = () => {
    setStartIndex((prevIndex) =>
      (prevIndex - itemsPerPage + products.length) % products.length
    );
  };

  const visibleProducts = [...products, ...products].slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={prevItems}
            className="rounded-full h-10 w-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={nextItems}
            className="rounded-full h-10 w-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <Card key={`${product.id}-${startIndex}`} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-0 relative">
              <Link to="/products" className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />

                  {/* Product tags */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
                    )}
                    {product.discount && (
                      <Badge className="bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>
                    )}
                  </div>

                  {/* Quick actions */}
                  <div className="absolute top-3 right-3">
                    <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/70 text-gray-700 dark:text-gray-200">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Quick view button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button className="bg-white/90 dark:bg-black/70 text-black dark:text-white hover:bg-white dark:hover:bg-black/90 flex items-center gap-1">
                      <Eye className="h-4 w-4" /> Quick View
                    </Button>
                  </div>
                </div>

                {/* AR Try-on button */}
                <div className="absolute bottom-0 w-full p-3 flex justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-sm">
                    Try On with AR
                  </Button>
                </div>
              </Link>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <Link to="/products" className="hover:underline">
                <h3 className="font-medium">{product.name}</h3>
              </Link>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : i < product.rating
                            ? "text-yellow-500 fill-yellow-500 stroke-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
              <div className="mt-2 flex items-center">
                <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-muted-foreground line-through text-sm">
                    ₹{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/products">
          <Button variant="outline" size="lg" className="rounded-full px-8">
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProductCarousel;