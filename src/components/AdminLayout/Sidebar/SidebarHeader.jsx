import { Button } from "@/components/common/Button";
import { ShoppingBag, X } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const SidebarHeader = React.memo(({ setSidebarOpen }) => {
  return (
    <>
      <Link to="/">
        <div className="flex items-center mr-8">
          <ShoppingBag className="h-8 w-8 text-indigo-400" />
          <span className="ml-2 text-xl font-bold text-heading">
            CatalogStore
          </span>
        </div>
      </Link>
      <Button
        variant="icon"
        size="sm"
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden "
      >
        <X className="h-6 w-6" />
      </Button>
    </>
  );
});

export default SidebarHeader;
