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
      <DashboardSidebar />
      {children}
    </div>
  );
}
