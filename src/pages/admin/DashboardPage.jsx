import AdminLayout from "@/components/AdminLayout/AdminLayout";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const adminUser = {
    name: "Sarah Admin",
    email: "sarah@catalogstore.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616c66e1de0?w=40&h=40&fit=crop",
  };

  // useEffect(() => {
  //   const timer = setInterval(() => setCurrentDate(new Date()), 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <>
      <AdminLayout title="Dashboard">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {adminUser.name}!
            </h2>
            <p className="opacity-90">
              Here's what's happening with your store today.
            </p>
            <div className="mt-4 text-sm opacity-80">
              {currentDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </AdminLayout>
      ;
    </>
  );
};

export default DashboardPage;
