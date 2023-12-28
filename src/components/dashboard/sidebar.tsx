import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import { dashboardSidebarList } from "@/constants/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const DashboardSidebar = () => {
  return (
    <aside className="border-r border-gray-200 dark:border-gray-700 h-screen">
      {/* <Input placeholder="Search" className="w-full" /> */}
      <ul>
        {dashboardSidebarList.map((item, index) => (
          <li key={index} className="p-2">
            {item.pages ? (
              <Accordion type="single" collapsible>
                <AccordionItem value={item.title} className="border-none">
                  <AccordionTrigger className="flex p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="ml-3 mt-2">
                    <ul className="space-y-2">
                      {item.pages?.map((page) => (
                        <li key={page.title}>
                          <Link
                            href={`/dashboard/${page.title
                              .toLowerCase()
                              .replace(" ", "-")}`}
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {page.icon}
                            <span className="ml-3">{page.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                href={item.title.toLowerCase().replace(" ", "-")}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
