import AdminLayout from "@/components/AdminLayout/AdminLayout";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const currentDate = new Date();
  const userSelector = useSelector((state) => state.user);

  // useEffect(() => {
  //   const timer = setInterval(() => setCurrentDate(new Date()), 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <>
      <AdminLayout title="Dashboard">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-background to-surface rounded-xl p-6 text-text">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {userSelector.name} ({userSelector.role})!
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
