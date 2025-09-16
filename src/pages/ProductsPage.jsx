import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/Sections/ProductsPage/HeaderSection";
import Toolbar from "@/components/Sections/ProductsPage/Toolbar";
import SidebarFilters from "@/components/Sections/ProductsPage/SidebarFilters";
import { ProductCard } from "@/components/common/Card";
import { formatPrice } from "@/lib/formatPrice";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const allProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 1299000,
      rating: 2.8,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation",
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 2499000,
      rating: 4.9,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Electronics",
      description: "Advanced fitness tracking with heart rate monitor",
      inStock: true,
    },
    {
      id: 3,
      name: "Designer Leather Handbag",
      price: 899000,
      rating: 4.7,
      reviews: 67,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "Fashion",
      description: "Elegant leather handbag for modern women",
      inStock: true,
    },
    {
      id: 4,
      name: "Professional Running Shoes",
      price: 1599000,
      rating: 4.6,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Fashion",
      description: "Comfortable running shoes for professional athletes",
      inStock: false,
    },
    {
      id: 5,
      name: "Modern Coffee Maker",
      price: 2199000,
      rating: 4.5,
      reviews: 78,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      category: "Home & Living",
      description: "Automatic coffee maker with programmable settings",
      inStock: true,
    },
    {
      id: 6,
      name: "Yoga Mat Premium",
      price: 299000,
      rating: 4.4,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      category: "Sports",
      description: "Non-slip yoga mat with extra thickness",
      inStock: true,
    },
    {
      id: 7,
      name: "Bluetooth Speaker",
      price: 699000,
      rating: 4.3,
      reviews: 91,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      category: "Electronics",
      description: "Portable bluetooth speaker with rich bass",
      inStock: true,
    },
    {
      id: 8,
      name: "Minimalist Desk Lamp",
      price: 459000,
      rating: 4.2,
      reviews: 45,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
      category: "Home & Living",
      description: "Adjustable LED desk lamp with touch control",
      inStock: true,
    },
  ];

  useEffect(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  return (
    <Layout>
      {/* Header */}
      <HeaderSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <SidebarFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            formatPrice={formatPrice}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <Toolbar
              filteredProducts={filteredProducts}
              allProducts={allProducts}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-background rounded-lg shadow-lg p-12 text-center">
                <div className="text-foreground mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-heading mb-2">
                  No products found
                </h3>
                <p className="text-text-secondary">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
