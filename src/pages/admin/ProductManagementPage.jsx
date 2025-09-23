import AdminLayout from "@/components/AdminLayout/AdminLayout";
import { Button } from "@/components/common/Button";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const ProductManagementPage = () => {
  return (
    <AdminLayout
      title="Product Management"
      rightSection={
        <Link to="/admin/products/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      }
    >
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              1
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-lg object-cover"
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop"
                  alt="Product"
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 text-wrap">
                    Premium Headphones
                  </div>
                  <div className="text-sm text-gray-500">SKU: ATP-WH-001</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Electronics
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
              Rp 1,299,000
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              145
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <button className="text-indigo-600 hover:text-indigo-900">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="text-yellow-600 hover:text-yellow-900">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default ProductManagementPage;
