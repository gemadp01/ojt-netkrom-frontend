import { useEffect, useState } from "react";
import { Heart, Trash2, Package, Weight, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Link } from "react-router";
import { Button } from "@/components/common/Button";

const WishlistPage = () => {
  // Sample wishlist data - in real app this would come from Redux/Context or API

  const [wishlistItems, setWishlistItems] = useState([]);
  const token = localStorage.getItem("token");

  const fetchWishlistItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/wishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.success === false) {
          throw new Error(result.message);
        }
        console.error("Failed to fetch wishlist items!");
      }

      setWishlistItems(result.wishlist);
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const isConfirm = confirm(
        "Are you sure you want to remove this product from your wishlist?"
      );

      if (!isConfirm) {
        return;
      }

      await fetch("http://localhost:3000/api/wishlist/" + productId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Product removed from wishlist");
      setWishlistItems((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
      console.log(wishlistItems);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = (wishlistItems) => {
    const itemsPrice = wishlistItems.map((item) => item.product);
    return itemsPrice.reduce((sum, item) => sum + item.price, 0);
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length === 0
              ? "No items"
              : `${wishlistItems.length} items`}{" "}
            in your wishlist
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
            {wishlistItems.map((wishlist) => {
              return (
                <div
                  key={wishlist.product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-64 h-64 lg:h-48 flex-shrink-0">
                      <img
                        src={`http://localhost:3000/${wishlist.product.image}`}
                        alt={wishlist.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {wishlist.product.name}
                          </h3>
                          <span className="bg-foreground text-surface px-3 py-1 rounded-full text-sm">
                            {wishlist.product.category.includes("_")
                              ? wishlist.product.category
                                  .split("_")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1).toLowerCase()
                                  )
                                  .join(" & ")
                              : wishlist.product.category
                                  .charAt(0)
                                  .toUpperCase() +
                                wishlist.product.category
                                  .slice(1)
                                  .toLowerCase()}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            removeFromWishlist(wishlist.product._id)
                          }
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {wishlist.product.description}
                      </p>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <span className="font-semibold text-lg text-foreground">
                            {formatPrice(wishlist.product.price)}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Package className="h-4 w-4 mr-1" />
                          <span>SKU: {wishlist.product.sku}</span>
                        </div>

                        <div className="flex items-center">
                          {wishlist.product.stock ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              <span>
                                In Stock ({wishlist.product.stock} available)
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600">
                              <span>Out of Stock</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Weight className="h-4 w-4 mr-1" />
                          <span>{wishlist.product.weight} kg</span>
                        </div>
                      </div>

                      <div className="gap-3">
                        <Link to={`/products/${wishlist.product._id}`}>
                          <Button variant="outline" width="full">
                            View Details
                          </Button>
                        </Link>
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
                  {formatPrice(totalPrice(wishlistItems))}
                </span>
              </div>
              {/* <div className="flex gap-3">
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
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
