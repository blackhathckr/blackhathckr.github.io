import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { OrderProvider } from './contexts/OrderContext';
import { TryonProvider } from './contexts/TryonContext';
import { RecommendationProvider } from './contexts/RecommendationContext';
import { AppRoutes } from '@/routes';
import Navbar from './LandingPage/Navbar';
import { useEffect } from 'react';
// import { loadScripts } from './components/ui/scripts';

function App() {
  // useEffect(() => {
  //   loadScripts()
  //     .then(() => {
  //       console.log('Scripts loaded successfully');
  //     })
  //     .catch(error => {
  //       console.error('Error loading scripts:', error);
  //     });
  // }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <TryonProvider>
                <RecommendationProvider>
                  <div className="min-h-screen bg-background">
                    <Navbar />
                    <AppRoutes />
                  </div>
                </RecommendationProvider>
              </TryonProvider>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
