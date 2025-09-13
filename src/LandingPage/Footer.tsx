import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
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

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t p-2">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Smart Wardrobe
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Redefining online shopping with our revolutionary AR technology.
              Try before you buy, right from your device.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <FacebookIcon className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <InstagramIcon className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <TwitterIcon className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                <YoutubeIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground">
                  Kids
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Help */}
          <div>
            <h3 className="font-medium text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get special offers, free giveaways, and new arrival notifications.
            </p>
            <div className="flex gap-2 mb-6">
              <Input
                type="email"
                placeholder="Your email"
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

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  Bengaluru
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+919876543210</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@smartwardrobe.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 Smart Wardrobe. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;