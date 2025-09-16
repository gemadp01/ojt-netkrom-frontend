import React, { useState, useEffect } from "react";
import { Search, Filter, Star, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/Sections/ProductsPage/HeaderSection";
import Toolbar from "@/components/Sections/ProductsPage/Toolbar";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Books",
    "Beauty",
  ];

  const allProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 1299000,
      rating: 4.8,
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const ProductCard = ({ product }) => (
    <div
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <div
        className={`relative ${
          viewMode === "list" ? "w-48 flex-shrink-0" : ""
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover ${
            viewMode === "list" ? "w-full h-48" : "w-full h-64"
          }`}
        />
        <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
          {product.category}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-3 text-sm">{product.description}</p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.rating}) • {product.reviews} reviews
          </span>
        </div>

        <div
          className={`flex items-center ${
            viewMode === "list" ? "justify-between" : "justify-between"
          }`}
        >
          <span className="text-2xl font-bold text-indigo-600">
            {formatPrice(product.price)}
          </span>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            disabled={!product.inStock}
          >
            {product.inStock ? "View Details" : "Out of Stock"}
            {product.inStock && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Header */}
      <HeaderSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-gray-500"
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>

              <div
                className={`space-y-6 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000000"
                      step="100000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
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
                  <ProductCard key={product.id} product={product} />
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
