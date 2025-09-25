import { Button } from "@/components/common/Button";
import { navLinkClass, navLinkClassMobile } from "@/lib/navLinkClass";
import { ArrowLeft, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const loginLocation = location.pathname.startsWith("/login");
  const registerLocation = location.pathname.startsWith("/register");

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

          {!loginLocation && !registerLocation ? (
            <>
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

                  <div className="w-px h-6 bg-border my-auto"></div>

                  <div className="flex items-center space-x-4 ">
                    <Link to="/login">
                      <Button variant="primary" size="sm">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" size="sm">
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center ">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Store
              </Button>
            </Link>
          )}
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

              <div className="pt-4 pb-2 border-t border-border">
                <div className="space-y-2">
                  <Link to="/login" className="block">
                    <Button variant="primary" size="sm" width="full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" className="block">
                    <Button variant="outline" size="sm" width="full">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
