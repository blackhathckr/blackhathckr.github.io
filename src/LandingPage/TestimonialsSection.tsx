import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Aishwarya",
    avatar: "/api/placeholder/40/40",
    location: "New York, NY",
    rating: 5,
    text: "The AR try-on feature is a game changer! I was hesitant about buying clothes online, but being able to see exactly how they'd look on me made it so easy to decide. The quality matched what I saw in AR perfectly.",
    product: "Oversized Cotton Tee"
  },
  {
    id: 2,
    name: "Abhimanyu",
    avatar: "/api/placeholder/40/40",
    location: "Los Angeles, CA",
    rating: 5,
    text: "I've been shopping online for years, but ARdrobe brings a whole new experience. The AR tech is incredibly accurate - what you see is what you get. Customer service is top-notch too!",
    product: "Smart Casual Blazer"
  },
  {
    id: 3,
    name: "Varshitha",
    avatar: "/api/placeholder/40/40",
    location: "Chicago, IL",
    rating: 4,
    text: "Love being able to mix and match different pieces to create outfits before buying. Saved me from making several fashion mistakes! The clothes are high quality and shipping was faster than expected.",
    product: "Slim Fit Denim Jeans"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real experiences from customers who have used our AR try-on technology
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md relative"
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Quote className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 py-1 px-2 rounded-full">
                    {testimonial.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full h-10 w-10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full h-10 w-10"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="link" className="gap-1">
            See All Reviews <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;