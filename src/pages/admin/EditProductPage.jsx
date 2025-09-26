import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, AlertCircle, Upload, X, Loader2 } from "lucide-react";
import AdminLayout from "@/components/AdminLayout/AdminLayout";
import { Button } from "@/components/common/Button";
import { Link, useNavigate, useParams } from "react-router";

// Category labels constant
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

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      status: "active",
      price: 0,
      sku: "",
      stock: 0,
      weight: 0,
      image: null,
    },
  });

  // Fetch product data when component mounts (for edit mode)
  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      setIsLoadingProduct(true);
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }

      const result = await response.json();

      const { product } = result;

      // Populate form with existing product data
      reset({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        status: product.status || "active",
        price: product.price || 0,
        sku: product.sku || "",
        stock: product.stock || 0,
        weight: product.weight || 0,
      });

      // Set preview image if exists
      if (product.image) {
        setPreview(product.image);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setStatus({
        success: false,
        message: "Failed to load product data",
      });
    } finally {
      setIsLoadingProduct(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB limit)
      if (file.size > 2000000) {
        setStatus({
          success: false,
          message: "File size must be less than 2MB",
        });
        return;
      }

      // Validate file type
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setStatus({
          success: false,
          message: "Only JPG and PNG files are allowed",
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setValue("image", null);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setStatus(null);

      const formData = new FormData();

      // Append all form fields
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key] && data[key][0]) {
          formData.append("image", data[key][0]);
        } else if (key !== "image") {
          formData.append(key, data[key]);
        }
      });

      const response = await fetch(
        "http://localhost:3000/api/products/" + productId,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setStatus({
          success: true,
          message: "Product updated successfully!",
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/admin/products");
        }, 2000);
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({
        success: false,
        message: error.message || "Failed to save product",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <AdminLayout title="Edit Product">
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading product data...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Product">
      <div className="my-2 border-b border-gray-200">
        <div className="flex items-center">
          <Link to="/admin/products">
            <Button
              variant="link"
              size="sm"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {status?.success === true && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center mb-6">
          <Save className="h-5 w-5 text-green-500 mr-3" />
          <span className="text-green-700">{status?.message}</span>
        </div>
      )}

      {status?.success === false && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center mb-6">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
          <span className="text-red-700">{status?.message}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
        encType="multipart/form-data"
      >
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                {...register("name", {
                  required: "Product name is required",
                  maxLength: {
                    value: 100,
                    message: "Product name must be less than 100 characters",
                  },
                })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Product description is required",
                  maxLength: {
                    value: 1000,
                    message:
                      "Product description must be less than 1000 characters",
                  },
                })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select category</option>
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Pricing & Inventory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">Rp</span>
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 1,
                      message: "Price must be greater than 0",
                    },
                    valueAsNumber: true,
                  })}
                  min={1}
                  className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0"
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU *
              </label>
              <input
                type="text"
                {...register("sku", {
                  required: "SKU is required",
                  maxLength: {
                    value: 50,
                    message: "SKU must be less than 50 characters",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter SKU (Stock Keeping Unit)"
              />
              {errors.sku && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sku.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                {...register("stock", {
                  required: "Stock is required",
                  min: {
                    value: 0,
                    message: "Stock must be 0 or greater",
                  },
                  valueAsNumber: true,
                })}
                min={0}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                min={0}
                step="0.1"
                {...register("weight", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0.0"
              />
              {errors.weight && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.weight.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Product Images
          </h2>

          <div className="mb-4">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload images</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
              </div>
              <input
                type="file"
                {...register("image", {
                  required: preview ? false : "Image is required",
                  validate: {
                    lessThan2MB: (files) =>
                      !files[0] ||
                      files[0]?.size < 2000000 ||
                      "Max file size is 2MB",
                    acceptedFormats: (files) =>
                      !files[0] ||
                      ["image/jpeg", "image/png", "image/jpg"].includes(
                        files[0]?.type
                      ) ||
                      "Only JPG/PNG files are allowed",
                  },
                })}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {preview && (
            <div className="relative inline-block">
              <img
                src={
                  typeof preview === "string"
                    ? `http://localhost:3000/${preview}`
                    : preview
                }
                alt="Product preview"
                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Link to="/admin/products">
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="min-w-[140px]"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Product
              </>
            )}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default EditProductPage;
