import "./App.css";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import { Route, Routes, useLocation } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import ProductManagementPage from "@/pages/admin/ProductManagementPage";
import CreateProductPage from "@/pages/admin/CreateProductPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CounterPage from "@/pages/CounterPage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AdminProfilePage from "@/pages/admin/AdminProfilePage";
import EditProductPage from "@/pages/admin/EditProductPage";
import WishlistPage from "@/pages/WishlistPage";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  const hydrateAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsHydrated(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Invalid token");

      const user = await response.json();
      const { _id, name, email, role } = user;
      dispatch({
        type: "USER_LOGIN",
        payload: {
          id: _id,
          name,
          email,
          role,
        },
      });
    } catch (err) {
      console.error("Gagal fetch user: ", err);
      localStorage.removeItem("token");
    } finally {
      setIsHydrated(true);
    }
  };

  useEffect(() => {
    hydrateAuth();
  }, []);

  if (!isHydrated)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-gray-200 border-t-foreground rounded-full animate-spin"></div>
        </div>
      </div>
    );

  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/counter" element={<CounterPage />} />

        {/* Admin Route */}
        <Route path="/admin">
          <Route path="profile" element={<AdminProfilePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="products/:productId" element={<EditProductPage />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
