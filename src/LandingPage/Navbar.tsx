import { useState, useEffect } from "react";
import { Search, Sun, Moon, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState("dark");
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { items: cartItems } = useCart();
    const { items: wishlistItems } = useWishlist();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Smart Wardrobe
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Clothing</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 w-[400px] grid-cols-2">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500/20 to-blue-500/20 p-6 no-underline outline-none focus:shadow-md"
                                                    to="/products"
                                                >
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        New Arrivals
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Check out the latest fashion trends for Spring 2025
                                                    </p>
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                        {["Men", "Women", "Kids", "Accessories", "Footwear", "Seasonal"].map((item) => (
                                            <li key={item}>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        to="/products"
                                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                    >
                                                        <div className="text-sm font-medium leading-none">{item}</div>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                                        {["Spring 2025", "Summer Essentials", "Workwear", "Athleisure", "Formal Edit", "Sustainable Fashion"].map((collection) => (
                                            <li key={collection}>
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        to="/products"
                                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                    >
                                                        <div className="text-sm font-medium leading-none">{collection}</div>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    href="/products"
                                >
                                    AR Try-On
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    href="/products"
                                >
                                    Deals
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Search and Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search products..."
                            className="w-64 rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/wishlist')}
                        className="relative"
                    >
                        <Heart className="h-5 w-5" />
                        {wishlistItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                                {wishlistItems.length}
                            </span>
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/cart')}
                        className="relative"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </Button>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate('/orders')}>
                                    Orders
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem onClick={() => navigate('/recommendations')}>
                                    Recommendations
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/tryon-history')}>
                                    Try-on History
                                </DropdownMenuItem> */}
                                <DropdownMenuItem onClick={handleLogout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="ghost" size="icon" onClick={() => navigate('/login')}>
                            <User className="h-5 w-5" />
                        </Button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Button
                        size="icon"
                        variant="ghost"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-16 z-50 bg-background p-6 md:hidden">
                    <div className="flex flex-col gap-6">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Search products..."
                                className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm"
                            />
                        </div>

                        <nav className="flex flex-col gap-5">
                            <h3 className="font-semibold text-lg">Menu</h3>
                            <a href="/category/women" className="py-2 text-foreground">Women</a>
                            <a href="/category/men" className="py-2 text-foreground">Men</a>
                            <a href="/category/kids" className="py-2 text-foreground">Kids</a>
                            <a href="/ar-experience" className="py-2 text-foreground font-medium text-purple-600 dark:text-purple-400">AR Try-On</a>
                            <a href="/collections" className="py-2 text-foreground">Collections</a>
                            <a href="/deals" className="py-2 text-foreground">Deals</a>
                            <hr className="my-2" />
                            {user ? (
                                <>
                                    <a href="/profile" className="py-2 text-foreground">Profile</a>
                                    <a href="/orders" className="py-2 text-foreground">Orders</a>
                                    <a href="/tryon-history" className="py-2 text-foreground">Try-on History</a>
                                    <button onClick={handleLogout} className="py-2 text-foreground text-left">Logout</button>
                                </>
                            ) : (
                                <a href="/login" className="py-2 text-foreground">Login</a>
                            )}
                            <a href="/cart" className="py-2 text-foreground">Cart</a>
                            <a href="/wishlist" className="py-2 text-foreground">Wishlist</a>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;