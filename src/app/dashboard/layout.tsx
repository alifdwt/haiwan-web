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
      <div className="grid gap-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="hidden xl:block col-span-1">
          <DashboardSidebar />
        </div>
        <div className="xl:col-span-4 2xl:col-span-5 p-4">{children}</div>
      </div>
    </div>
  );
}
