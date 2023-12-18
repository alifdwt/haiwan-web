import {
  Barcode,
  Briefcase,
  CalendarDays,
  CalendarRange,
  LayoutDashboard,
  Mail,
  ShoppingBasket,
  Users,
  User,
} from "lucide-react";

export const dashboardSidebarList = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard />,
    pages: [
      {
        title: "Monthly Overview",
        href: "/dashboard",
        icon: <CalendarDays />,
      },
      {
        title: "Annual Overview",
        href: "/dashboard/annual-overview",
        icon: <CalendarRange />,
      },
    ],
  },
  {
    title: "Inbox",
    icon: <Mail />,
  },
  {
    title: "Catalogue",
    icon: <Briefcase />,
    pages: [
      {
        title: "Products",
        icon: <ShoppingBasket />,
      },
      {
        title: "Invoice",
        icon: <Barcode />,
      },
    ],
  },
  {
    title: "Users",
    icon: <Users />,
    pages: [
      {
        title: "User list",
        icon: <Users />,
      },
      {
        title: "Profile",
        icon: <User />,
      },
    ],
  },
];
