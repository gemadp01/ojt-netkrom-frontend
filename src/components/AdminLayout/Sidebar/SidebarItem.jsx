import { navLinkClassSidebar } from "@/lib/navLinkClass";
import { Home, Package } from "lucide-react";
import React, { useMemo } from "react";
import { NavLink } from "react-router";

const SidebarItem = React.memo(() => {
  const sidebarItems = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: Home,
        path: "/admin/dashboard",
      },
      {
        id: "products",
        label: "Products",
        icon: Package,
        path: "/admin/products",
      },
    ],
    []
  );

  return (
    <div className="space-y-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => navLinkClassSidebar(isActive)}
          >
            <Icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>
        );
      })}
    </div>
  );
});

export default SidebarItem;
