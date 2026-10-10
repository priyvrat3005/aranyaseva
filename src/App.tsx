import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import McpStatusIndicator from './components/McpStatusIndicator';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NurseriesPage from './pages/NurseriesPage';
import NurseryDetailPage from './pages/NurseryDetailPage';
import ServicesPage from './pages/ServicesPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import ApiPage from './pages/ApiPage';
import VendorRegisterPage from './pages/VendorRegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminImportPage from './pages/AdminImportPage';
import AdminCataloguePage from './pages/AdminCataloguePage';
import NurseryCataloguePage from './pages/NurseryCataloguePage';
import { ensureMcpConnection } from './lib/data-service';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function McpInitializer() {
  useEffect(() => {
    // Attempt MCP connection on app load (non-blocking)
    ensureMcpConnection().catch(() => {
      // Silently fall back to offline mode
    });
  }, []);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <McpInitializer />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/plant/:slug" element={<ProductDetailPage />} />
              <Route path="/nurseries" element={<NurseriesPage />} />
              <Route path="/nursery/:slug" element={<NurseryDetailPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/*" element={<AccountPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/api" element={<ApiPage />} />
              <Route path="/vendor/register" element={<VendorRegisterPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/import" element={<AdminImportPage />} />
              <Route path="/admin/catalogue" element={<AdminCataloguePage />} />
              <Route path="/nursery/catalogue" element={<NurseryCataloguePage />} />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌿</div>
                    <h2 className="text-2xl font-bold text-text mb-2">Page Not Found</h2>
                    <p className="text-text-muted mb-4">The page you're looking for doesn't exist.</p>
                    <a href="/" className="text-primary font-medium hover:underline">← Go Home</a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
        {/* MCP Connection Status Indicator */}
        <McpStatusIndicator />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
