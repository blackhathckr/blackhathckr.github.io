import { Link} from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import womensfashion from "@/assets/landing-page/categories/womans-fashion.jpg"
import mensstyle from "@/assets/landing-page/categories/mens-style.jpg"
import accessories from "@/assets/landing-page/categories/accessories.jpg"
import fashiontech from "@/assets/landing-page/categories/fashion-tech.jpg"

const categories = [
  {
    id: "womens",
    name: "Women's Fashion",
    image: womensfashion,
    color: "from-pink-500/20 to-rose-500/20",
    darkColor: "from-pink-900/30 to-rose-900/30",
  },
  {
    id: "mens",
    name: "Men's Style",
    image: mensstyle,
    color: "from-blue-500/20 to-cyan-500/20",
    darkColor: "from-blue-900/30 to-cyan-900/30",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: accessories,
    color: "from-amber-500/20 to-yellow-500/20",
    darkColor: "from-amber-900/30 to-yellow-900/30",
  },
  {
    id: "tech",
    name: "Fashion Tech",
    image: fashiontech,
    color: "from-purple-500/20 to-violet-500/20",
    darkColor: "from-purple-900/30 to-violet-900/30",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to="/products"
            className="group"
          >
            <Card className="overflow-hidden h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0 relative h-80">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} dark:${category.darkColor} group-hover:opacity-80 transition-opacity`}
                />
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 to-transparent">
                  <h3 className="font-semibold text-xl text-white mb-2">
                    {category.name}
                  </h3>
                  <span className="flex items-center text-sm text-white/90 group-hover:text-white group-hover:translate-x-1 transition-transform">
                    Shop now <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;