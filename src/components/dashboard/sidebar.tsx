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
    <>
      <aside
        id="sidebar"
        className="fixed top-2 left-0 z-20 hidden flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2">
                <li>
                  <form action="#" method="GET">
                    <Label htmlFor="dashboard-search" className="sr-only">
                      Search
                    </Label>
                    <div className="relative">
                      {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div> */}
                      <Input
                        id="dashboard-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>
                {dashboardSidebarList.map((item) => (
                  <li key={item.title}>
                    {item.pages ? (
                      <Accordion type="single" collapsible>
                        <AccordionItem
                          value={item.title}
                          className="border-none"
                        >
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
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
