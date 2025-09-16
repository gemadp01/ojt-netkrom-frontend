import { navLinkClass, navLinkClassMobile } from "@/lib/navLinkClass";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background shadow-[0px_10px_10px_-10px_rgb(0,0,0,.3)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-indigo-400" />
            {/* <span className="ml-2 text-xl font-bold text-heading">
              CatalogStore
            </span> */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink
                end
                to="/"
                className={({ isActive }) => navLinkClass(isActive)}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) => navLinkClass(isActive)}
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => navLinkClass(isActive)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => navLinkClass(isActive)}
              >
                Contact
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground focus:outline-none cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
              <NavLink
                to="/"
                className={({ isActive }) => navLinkClassMobile(isActive)}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) => navLinkClassMobile(isActive)}
              >
                Products
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => navLinkClassMobile(isActive)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => navLinkClassMobile(isActive)}
              >
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
