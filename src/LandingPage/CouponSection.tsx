import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Scissors, Copy, Check } from "lucide-react";

const coupons = [
  {
    id: "welcome15",
    code: "WELCOME15",
    description: "15% off your first purchase",
    expiry: "Valid for new customers",
  },
  {
    id: "spring25",
    code: "SPRING25",
    description: "25% off Spring collection",
    expiry: "Expires April 30, 2025",
  },
  {
    id: "freeship75",
    code: "FREESHIP75",
    description: "Free shipping on orders over ₹75",
    expiry: "Limited time offer",
  },
];

const CouponSection = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-purple-950/5 dark:to-blue-950/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Exclusive Offers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Save on your favorite styles with these special discounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md border border-dashed border-purple-200 dark:border-purple-900/30 relative"
            >
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-purple-50 dark:bg-gray-950 rounded-full"></div>
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-purple-50 dark:bg-gray-950 rounded-full"></div>
              
              <div className="px-4 py-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-purple-600 dark:text-purple-400">
                    <Scissors className="h-4 w-4 mr-1" />
                    <span className="text-xs font-medium">COUPON</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {coupon.expiry}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-lg font-bold tracking-wider">
                    {coupon.code}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleCopy(coupon.id, coupon.code)}
                    aria-label={`Copy code ${coupon.code}`}
                  >
                    {copiedId === coupon.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {coupon.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
          <h3 className="font-medium mb-3">Get More Exclusive Offers</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe to our newsletter for exclusive deals and updates
          </p>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Subscribe</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Thank you for subscribing!</AlertDialogTitle>
                    <AlertDialogDescription>
                      We'll send you updates on our latest products and promotions.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Okay</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CouponSection;