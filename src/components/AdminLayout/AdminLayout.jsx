import React, { useCallback, useState } from "react";
import { Menu, ChevronDown, LogOut } from "lucide-react";
import { AdminPage } from "@/components/guard/AdminPage";
import SidebarItem from "@/components/AdminLayout/Sidebar/SidebarItem";
import SidebarHeader from "@/components/AdminLayout/Sidebar/SidebarHeader";
import { Button } from "@/components/common/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const AdminLayout = ({ title, rightSection, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSidebarOpen = useCallback((tab) => {
    setSidebarOpen(tab);
  }, []);

  const adminUser = {
    name: "Sarah Admin",
    email: "sarah@catalogstore.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616c66e1de0?w=40&h=40&fit=crop",
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    await fetch("/api/auth/logout");

    localStorage.removeItem("token");
    dispatch({ type: "USER_LOGOUT" });

    navigate("/login");
  };

  return (
    <AdminPage>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <SidebarHeader setSidebarOpen={handleSidebarOpen} />
          </div>

          <nav className="mt-6 px-6">
            <SidebarItem />
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={adminUser.avatar}
                alt="Admin"
              />
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {adminUser.name}
                </p>
                <p className="text-sm text-gray-500">{adminUser.email}</p>
              </div>
              <form onSubmit={handleLogout}>
                <Button type="submit" variant="icon" size="sm">
                  <LogOut className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
            onClick={() => handleSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="lg:ml-72">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center">
                <Button
                  variant="icon"
                  size="sm"
                  onClick={() => handleSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-gray-100">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={adminUser.avatar}
                      alt="Admin"
                    />
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {adminUser.name}
                      </div>
                      <div className="text-sm text-gray-500">Admin</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <div className="mt-4 sm:mt-0 flex space-x-3">
                  {rightSection}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </AdminPage>
  );
};

export default AdminLayout;
