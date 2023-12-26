import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ items, className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex space-x-2", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "group flex w-full items-center rounded-md py-2 px-3 text-sm font-medium",
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-center"
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
