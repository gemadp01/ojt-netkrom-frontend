import { Button } from "@/components/common/Button";
import { navLinkClass, navLinkClassMobile } from "@/lib/navLinkClass";
import {
  ArrowLeft,
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();
  const loginLocation = location.pathname.startsWith("/login");
  const registerLocation = location.pathname.startsWith("/register");

  const userSelector = useSelector((state) => state.user);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();

    await fetch("/api/auth/logout");

    setIsProfileOpen(false);

    localStorage.removeItem("token");
    dispatch({ type: "USER_LOGOUT" });
  };

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

                  <div className="flex items-center space-x-4">
                    {userSelector.id ? (
                      // Profile Dropdown for authenticated users
                      <div className="relative">
                        <Button
                          variant="icon"
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          className="space-x-2 "
                        >
                          <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-background" />
                          </div>
                          <span className="text-sm font-medium">
                            {userSelector.name}
                          </span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-foreground rounded-md shadow-lg  z-10">
                            <div className="py-1">
                              {userSelector.role === "admin" ? (
                                // Admin Menu
                                <>
                                  <Link
                                    to="/admin/dashboard"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setIsProfileOpen(false)}
                                  >
                                    <LayoutDashboard className="h-4 w-4 mr-2" />
                                    Dashboard
                                  </Link>
                                  <form onSubmit={handleLogout}>
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                      <LogOut className="h-4 w-4 mr-2" />
                                      Logout
                                    </button>
                                  </form>
                                </>
                              ) : (
                                // Regular User Menu
                                <>
                                  <Link
                                    to="/wishlist"
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setIsProfileOpen(false)}
                                  >
                                    <Heart className="h-4 w-4 mr-2" />
                                    Wishlist
                                  </Link>
                                  <form onSubmit={handleLogout}>
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                      <LogOut className="h-4 w-4 mr-2" />
                                      Logout
                                    </button>
                                  </form>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Auth Buttons for non-authenticated users
                      <>
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
                      </>
                    )}
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

              {/* Mobile Auth Section */}
              <div className="pt-4 pb-2 border-t border-border">
                {userSelector.id ? (
                  // Profile section for authenticated users
                  <div className="space-y-2">
                    <div className="flex items-center px-2 py-2">
                      <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-background" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {userSelector.name}
                        </p>
                        <p className="text-xs text-text-secondary capitalize">
                          {userSelector.role}
                        </p>
                      </div>
                    </div>

                    {userSelector.role === "admin" ? (
                      // Admin Menu Mobile
                      <>
                        <Link to="/admin/dashboard" className="block">
                          <Button
                            variant="primary"
                            size="sm"
                            width="full"
                            className="justify-start"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <LayoutDashboard className="h-4 w-4 mr-2" />
                            Dashboard
                          </Button>
                        </Link>
                        <form onSubmit={handleLogout}>
                          <Button
                            variant="desctructive"
                            size="sm"
                            width="full"
                            className="justify-start"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </Button>
                        </form>
                      </>
                    ) : (
                      // Regular User Menu Mobile
                      <>
                        <Link to="/wishlist" className="block">
                          <Button
                            variant="primary"
                            size="sm"
                            width="full"
                            className="justify-start"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            Wishlist
                          </Button>
                        </Link>
                        <form onSubmit={handleLogout}>
                          <Button
                            variant="desctructive"
                            size="sm"
                            width="full"
                            className="justify-start"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </Button>
                        </form>
                      </>
                    )}
                  </div>
                ) : (
                  // Auth Buttons for non-authenticated users
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
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
