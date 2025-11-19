import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "./components/ui/custom-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { LikesProvider } from "./contexts/LikesContext";
import { OverlayProvider } from "./contexts/OverlayContext";
import { OrderHistoryProvider } from "./contexts/OrderHistoryContext";
import GlobalCartBar from "./components/GlobalCartBar";
import Index from "./pages/Index";
import ModernIndex from "./pages/ModernIndex";
import SaladMenu from "./pages/SaladMenu";
import Membership from "./pages/Membership";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Likes from "./pages/Likes";
import Cart from "./pages/Cart";
import EnhancedCart from "./pages/EnhancedCart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ReturnPolicy from "./pages/ReturnPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import AdminSalads from "./pages/AdminSaladsFixed";
import AdminOrders from "./pages/AdminOrdersFixed";
import AdminMemberships from "./pages/AdminMembershipsFixed";
import AdminSettings from "./pages/AdminSettingsFixed";
import AdminUsers from "./pages/AdminUsersFixed";
import AdminRoute from "./components/AdminRoute";
import TestAdminPage from "./pages/TestAdminPage";
import DebugPage from "./pages/DebugPage";
import SaladDetailMobile from "./pages/SaladDetailMobile";
import SaladDetailDesktop from "./pages/SaladDetailDesktop";
import SaladDetailTest from "./pages/SaladDetailTest";
import SimpleTest from "./components/SimpleTest";
import FallbackHome from "./components/FallbackHome";

const queryClient = new QueryClient();

const App = () => (
  
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <OrderHistoryProvider>
        <CartProvider>
          <LikesProvider>
            <OverlayProvider>
              <ToastProvider>
                <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/test" element={<SimpleTest />} />
                <Route path="/fallback" element={<FallbackHome />} />
                <Route path="/" element={<FallbackHome />} />
                <Route path="/full" element={<ModernIndex />} />
                <Route path="/classic" element={<Index />} />
                <Route path="/menu" element={<SaladMenu />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/about" element={<About />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/likes" element={<Likes />} />
                <Route path="/cart" element={<EnhancedCart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/debug" element={<DebugPage />} />
                <Route path="/salad-detail-test" element={<SaladDetailTest />} />
                
                {/* Salad Detail Routes */}
                <Route path="/salad-detail-mobile" element={<SaladDetailMobile />} />
                <Route path="/salad-detail-desktop" element={<SaladDetailDesktop />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/orders" replace />} />
                <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
                <Route path="/admin/salads" element={<AdminRoute><AdminSalads /></AdminRoute>} />
                <Route path="/admin/memberships" element={<AdminRoute><AdminMemberships /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
                <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <GlobalCartBar />
              </TooltipProvider>
            </ToastProvider>
          </OverlayProvider>
        </LikesProvider>
      </CartProvider>
      </OrderHistoryProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
