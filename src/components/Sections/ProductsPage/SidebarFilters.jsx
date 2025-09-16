import { Button } from "@/components/common/Button";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

// List of categories (data from API)
const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Sports",
  "Books",
  "Beauty",
];

const SidebarFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  formatPrice,
  priceRange,
  setPriceRange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-heading">Filters</h3>
          {/* button to show/hide filters on small screens */}
          <Button
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden text-text-secondary"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        <div
          className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
        >
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-subtle-text h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-surface rounded-lg"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
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
                  <span className="ml-2 text-sm text-text">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Price Range
            </label>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-text-secondary">
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
                className="w-full accent-foreground"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
