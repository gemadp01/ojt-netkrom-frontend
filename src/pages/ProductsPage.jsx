import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/Sections/ProductsPage/HeaderSection";
import Toolbar from "@/components/Sections/ProductsPage/Toolbar";
import SidebarFilters from "@/components/Sections/ProductsPage/SidebarFilters";
import { ProductCard } from "@/components/common/Card";
import { formatPrice } from "@/lib/formatPrice";
import { Link } from "react-router";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [status, setStatus] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.success === false) throw new Error(data.message);
      }

      if (data.length === 0) {
        setStatus("No products found");
      } else {
        setAllProducts(data);
      }
    } catch (error) {
      setStatus(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    } else {
      filtered = allProducts;
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
        case "newest":
          return b._id - a._id;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [allProducts, searchTerm, selectedCategory, sortBy, priceRange]);

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
                  {status}
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
                  <Link key={product._id} to={`/products/${product._id}`}>
                    <ProductCard
                      product={product}
                      viewMode={viewMode}
                      formatPrice={formatPrice}
                    />
                  </Link>
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
