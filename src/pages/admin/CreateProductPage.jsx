import AdminLayout from "@/components/AdminLayout/AdminLayout";
import { Button } from "@/components/common/Button";
import { AlertCircle, ArrowLeft, Save, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const CreateProductPage = () => {
  const [preview, setPreview] = useState("");
  const [status, setStatus] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

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

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("status", data.status);
    formData.append("price", data.price);
    formData.append("sku", data.sku);
    formData.append("stock", data.stock);
    if (data.weight !== "") formData.append("weight", data.weight);
    formData.append("image", data.image[0]);

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        // Kalau backend ngirim { success: false, message: "..." }
        if (result.success === false) {
          throw new Error(result.message);
        }

        // Kalau backend ngirim errors array
        if (result.errors) {
          result.errors.forEach((err) => {
            setError(err.path, {
              type: "server",
              message: err.msg,
            });
          });
        }

        return;
      }
      setStatus(result);
      reset();
      setPreview(""); // reset image preview
      setValue("image", null); // reset field image RHF
    } catch (error) {
      setStatus({
        success: false,
        message: (error.message = "Something went wrong"),
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    if (file.size >= 2000000 || !allowedTypes.includes(file.type)) {
      setPreview("");
      return;
    }

    // In real app, you would upload to server and get URLs
    const newImage = URL.createObjectURL(file);

    setPreview(newImage);
  };

  const handleRemoveImage = () => {
    setValue("image", null);
    setPreview("");
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(undefined);
      }, 5000);

      return () => clearTimeout(timer); // cleanup biar nggak leak
    }
  }, [status]);

  return (
    <AdminLayout title="Create Product">
      <div className="my-2 border-b border-border">
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
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <Save className="h-5 w-5 text-green-500 mr-3" />
          <span className="text-green-700">{status?.message}</span>
        </div>
      )}

      {status?.success === false && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
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
                      message: "Price must be greater than 1",
                    },
                  })}
                  min={0}
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
                    value: 20,
                    message: "SKU must be less than 20 characters",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter SKU (Stock Keeping Unit / Kode Unik)"
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
                  minLength: {
                    value: 1,
                    message: "Stock must be greater than 1",
                  },
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
                {...register("weight")}
                step="0.1"
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
                  required: "Image is required",
                  validate: {
                    lessThan2MB: (files) =>
                      files[0]?.size < 2000000 || "Max file size is 2MB",
                    acceptedFormats: (files) =>
                      ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                      "Only JPG/PNG files are allowed",
                  },
                })}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  handleImageUpload(e); // preview
                  register("image").onChange(e); // sync dengan RHF
                }}
              />
            </label>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt={`Product Product Image`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 left-20 bg-red-500 text-white rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="border-box flex flex-col space-y-1 m-2 lg:flex-row lg:items-center lg:justify-end lg:space-x-4">
          <Link to="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>

          <Button type="submit" variant="primary">
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-border mr-2"></div>
                Creating...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Product
              </>
            )}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default CreateProductPage;
