import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Package,
  Weight,
  DollarSign,
} from "lucide-react";

const CATEGORY_LABELS = {
  ELECTRONICS: "Electronics",
  CLOTHING_FASHION: "Clothing & Fashion",
  HOME_GARDEN: "Home & Garden",
  SPORTS_OUTDOORS: "Sports & Outdoors",
  BOOKS_MEDIA: "Books & Media",
  TOYS_GAMES: "Toys & Games",
  HEALTH_BEAUTY: "Health & Beauty",
  AUTOMOTIVE: "Automotive",
};

const WishlistPage = () => {
  // Sample wishlist data - in real app this would come from Redux/Context or API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      description:
        "Premium quality wireless headphones with noise cancellation and 30-hour battery life",
      category: "ELECTRONICS",
      status: "active",
      price: 149.99,
      sku: "WBH-001",
      stock: 25,
      weight: 0.35,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      description:
        "Advanced fitness tracking with heart rate monitor, GPS, and waterproof design",
      category: "ELECTRONICS",
      status: "active",
      price: 299.99,
      sku: "SFW-002",
      stock: 12,
      weight: 0.08,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      description:
        "Comfortable and sustainable organic cotton t-shirt in various colors",
      category: "CLOTHING_FASHION",
      status: "active",
      price: 29.99,
      sku: "OCT-003",
      stock: 50,
      weight: 0.2,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Indoor Plant Collection",
      description:
        "Set of 3 beautiful indoor plants perfect for home decoration and air purification",
      category: "HOME_GARDEN",
      status: "active",
      price: 79.99,
      sku: "IPC-004",
      stock: 8,
      weight: 2.5,
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    },
  ]);

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const addToCart = (product) => {
    // In real app, this would dispatch to cart state or call API
    console.log("Adding to cart:", product);
    // Optional: Show toast notification
    alert(`Added ${product.name} to cart!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "text-red-500" };
    if (stock <= 5) return { text: "Low Stock", color: "text-orange-500" };
    return { text: "In Stock", color: "text-green-500" };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            Coming soon...
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} in your wishlist
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-24 w-24 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Start adding products you love to your wishlist!
            </p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {wishlistItems.map((product) => {
              const stockStatus = getStockStatus(product.stock);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-64 h-64 lg:h-48 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {product.name}
                          </h3>
                          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mb-2">
                            {CATEGORY_LABELS[product.category]}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {product.description}
                      </p>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span className="font-semibold text-lg text-foreground">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Package className="h-4 w-4 mr-1" />
                          <span>SKU: {product.sku}</span>
                        </div>

                        <div className="flex items-center">
                          <span
                            className={`text-sm font-medium ${stockStatus.color}`}
                          >
                            {stockStatus.text} ({product.stock})
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Weight className="h-4 w-4 mr-1" />
                          <span>{product.weight}kg</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                            product.stock === 0
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-indigo-600 text-white hover:bg-indigo-700"
                          }`}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                        </button>

                        <button className="flex-1 sm:flex-none px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Action Bar (if items exist) */}
        {wishlistItems.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-gray-600">
                Total value:{" "}
                <span className="font-semibold text-foreground">
                  {formatPrice(
                    wishlistItems.reduce((sum, item) => sum + item.price, 0)
                  )}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setWishlistItems([])}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Clear Wishlist
                </button>
                <button
                  onClick={() =>
                    wishlistItems.forEach((item) => addToCart(item))
                  }
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add All to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
