import NavbarDashboard from "@/components/dashboard/navbar";
import DashboardSidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarDashboard />
      {/* <div className="border-b border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-5"> */}
      <DashboardSidebar />
      {children}
      {/* </div> */}
    </div>
  );
}
