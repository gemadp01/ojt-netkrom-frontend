import { ShoppingBag } from "lucide-react";
import { NavLink } from "react-router";

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

const Footer = () => {
  return (
    <footer className="bg-foreground text-surface py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          <div>
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">CatalogStore</span>
            </div>
            <p className="text-subtle-text">
              Your trusted online catalog for quality products and excellent
              service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-subtle-text hover:text-surface transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="text-subtle-text hover:text-surface transition-colors"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-subtle-text hover:text-surface transition-colors"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-subtle-text hover:text-surface transition-colors"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            {/* data will be fetched */}
            <ul className="space-y-2">
              {Object.entries(CATEGORY_LABELS).map(([key, value]) => (
                <li key={key}>
                  <NavLink
                    to="/products"
                    className="text-subtle-text hover:text-surface transition-colors"
                  >
                    {value}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-subtle-text hover:text-surface transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-subtle-text hover:text-surface transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-subtle-text hover:text-surface transition-colors"
                >
                  Youtube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 CatalogStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
