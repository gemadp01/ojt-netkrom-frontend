import { Button } from "@/components/common/Button";
import { ShoppingBag, X } from "lucide-react";
import React from "react";

const SidebarHeader = React.memo(({ setSidebarOpen }) => {
  return (
    <>
      <div className="flex items-center mr-8">
        <ShoppingBag className="h-8 w-8 text-indigo-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">
          CatalogStore
        </span>
      </div>
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
