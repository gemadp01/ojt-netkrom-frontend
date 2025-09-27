import { useEffect, useState } from "react";
import { Heart, Share2, ArrowLeft, CheckCircle, ZoomIn, X } from "lucide-react";
import { Link, useParams } from "react-router";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/common/Button";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    _id: "",
    name: "",
    description: "",
    category: "",
    status: "",
    price: 0,
    sku: "",
    stock: 0,
    weight: 0,
    image: "",
    createdAt: "",
    updatedAt: "",
  });
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlist, setIsWishlist] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  // const [status, setStatus] = useState("");
  //   name: "Premium Wireless Headphones",
  //   brand: "AudioTech Pro",
  //   price: 1299000,
  //   originalPrice: 1599000,
  //   discount: 19,
  //   rating: 4.8,
  //   totalReviews: 124,
  //   inStock: true,
  //   stockCount: 15,
  //   sku: "ATP-WH-001",
  //   category: "Electronics",
  //   tags: ["wireless", "bluetooth", "noise-canceling", "premium"],
  //   images: [
  //     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop",
  //   ],
  //   colors: [
  //     { name: "Black", value: "#000000" },
  //     { name: "White", value: "#FFFFFF" },
  //     { name: "Blue", value: "#3B82F6" },
  //     { name: "Red", value: "#EF4444" },
  //   ],
  //   sizes: ["S", "M", "L", "XL"],
  //   description: `
  //     Experience premium audio quality with our latest wireless headphones. Featuring advanced noise-cancellation technology,
  //     these headphones deliver crystal-clear sound and deep bass for an immersive listening experience.

  //     Perfect for music lovers, professionals, and anyone who appreciates high-quality audio. The comfortable over-ear design
  //     ensures hours of comfortable listening, while the long-lasting battery provides up to 30 hours of playback time.
  //   `,
  //   features: [
  //     "Advanced Active Noise Cancellation",
  //     "30-hour battery life with fast charging",
  //     "Premium leather ear cushions",
  //     "Bluetooth 5.0 connectivity",
  //     "Built-in microphone for calls",
  //     "Foldable design for portability",
  //   ],
  //   specifications: {
  //     "Driver Size": "40mm Dynamic",
  //     "Frequency Response": "20Hz - 20kHz",
  //     Impedance: "32 Ohms",
  //     Sensitivity: "105 dB",
  //     "Battery Life": "30 hours",
  //     "Charging Time": "2 hours",
  //     Weight: "280g",
  //     Connectivity: "Bluetooth 5.0, 3.5mm jack",
  //   },
  // };

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        if (data.success === false) throw new Error(data.message);
      }
      const { product } = data;
      setProduct(product);
    } catch (error) {
      alert(error.message);
    }
  };

  // const addToWishlist = async (e) => {
  //   e.preventDefault();
  //   console.log(productId);
  //   return;
  //   try {
  //     const response = await fetch("http://localhost:3000/api/wishlist", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json", // penting biar server tahu ini JSON
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({ productId }),
  //     });

  //     const result = await response.json();
  //     console.log(result);

  //     if (!response.ok) {
  //       if (result.success === false) throw new Error(result.message);
  //       throw new Error("Failed to add to wishlist");
  //     }

  //     alert(result.message);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  //   setIsWishlist(!isWishlist);
  // };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-foreground">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">
              {product.category.includes("_")
                ? product.category
                    .split("_")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" & ")
                : product.category}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link to="/products">
          <Button variant="outline">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={`http://localhost:3000/${product.image}`}
                  alt={product.name}
                  className="w-full h-96 object-cover cursor-pointer"
                  onClick={() => setShowImageModal(true)}
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <ZoomIn className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-heading mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center mb-6">
                {product.stock ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>In Stock ({product.stock} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <div className="flex space-x-4">
                {/* <form onSubmit={addToWishlist}> */}
                <button
                  type="submit"
                  onClick={() => setIsWishlist(!isWishlist)}
                  className={`flex-1 border-2 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                    isWishlist
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 mr-2 ${
                      isWishlist ? "fill-current" : ""
                    }`}
                  />
                  {isWishlist ? "In Wishlist" : "Add to Wishlist"}
                </button>
                {/* </form> */}

                <button className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? "border-foreground text-text"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-6">
                  Coming soon...
                </h4>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Coming soon...
                  </h4>
                  {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Write a Review
                  </button> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={`http://localhost:3000/${product.image}`}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
