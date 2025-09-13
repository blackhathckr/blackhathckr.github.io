import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Login } from './AR/Auth/Login';
import { Signup } from './AR/Auth/Signup';
import ProductsPage from './components/ui/ProductsPage';
import { CartPage } from './AR/Cart/CartPage';
import { WishlistPage } from './AR/Wishlist/WishlistPage';
import { OrderHistoryPage } from './AR/Orders/OrderHistoryPage';
import { CheckoutPage } from './AR/Checkout/CheckoutPage';
import { OrderSuccessPage } from './AR/Checkout/OrderSuccessPage';
import LandingPage from './LandingPage/LandingPage';
import { TryonHistoryPage } from './AR/Orders/TryonHistoryPage';
import { RecommendationSection } from './AR/Recommendations/RecommendationSection';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <WishlistPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <OrderHistoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <PrivateRoute>
            <RecommendationSection />
          </PrivateRoute>
        }
      />
      <Route
        path="/tryon-history"
        element={
          <PrivateRoute>
            <TryonHistoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/order-success"
        element={
          <PrivateRoute>
            <OrderSuccessPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}; 