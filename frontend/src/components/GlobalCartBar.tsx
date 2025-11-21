import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useOverlay } from "../contexts/OverlayContext";
import CartBar from "./CartBar";
import { useLocation, useNavigate } from "react-router-dom";

// Hide on detail pages (e.g. /menu/:id, /likes/:id, /cart, /login, /register, /profile, /admin/*)
const HIDE_ON_PATHS = [
  "/cart",
  "/login",
  "/register",
  "/profile",
  "/membership",
  "/about",
  "/admin",
];

export default function GlobalCartBar() {
  const { cart } = useCart();
  const { isSaladDetailOpen, isCartBarHidden } = useOverlay();
  const location = useLocation();
  const navigate = useNavigate();
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  const total = cart.total;
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Hide on detail overlay or if path matches any in HIDE_ON_PATHS or is a detail page
  const shouldHide = React.useMemo(() => {
    const path = location.pathname;
    if (HIDE_ON_PATHS.some((p) => path.startsWith(p))) return true;
    // Hide on salad detail overlay (e.g. /menu/123, /likes/123)
    if (/^\/menu\/[0-9]+$/.test(path) || /^\/likes\/[0-9]+$/.test(path)) return true;
    // Hide on mobile salad detail page (/salad/:id)
    if (/^\/salad\/[0-9A-Za-z]+$/.test(path)) return true;
    // Hide when salad detail overlay is open - but only if explicitly set to true
    // This prevents false positives from uninitialized state
    if (isSaladDetailOpen === true) return true;
    // Hide when explicitly requested (e.g., from mobile salad detail page)
    if (isCartBarHidden === true) return true;
    return false;
  }, [location.pathname, isSaladDetailOpen, isCartBarHidden]);

  // Handle showing/hiding with animation
  useEffect(() => {
    // Always show cart bar when items are added and shouldn't be hidden
    if (itemCount > 0 && !shouldHide) {
      setIsVisible(true);
      setIsExiting(false);
    } else if (isVisible && (itemCount === 0 || shouldHide)) {
      setIsExiting(true);
      // Hide after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
      }, 250); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [itemCount, shouldHide, isVisible]);

  // Force visibility when cart has items and on valid pages
  // This ensures cart bar appears immediately when items are added
  useEffect(() => {
    if (itemCount > 0 && !shouldHide && !isVisible) {
      setIsVisible(true);
      setIsExiting(false);
    }
  }, [itemCount, shouldHide, isVisible]);

  if (!isVisible) return null;

  return (
    <CartBar
      itemCount={itemCount}
      total={total}
      isExiting={isExiting}
      onViewCart={() => {
        navigate("/cart");
      }}
    />
  );
}
