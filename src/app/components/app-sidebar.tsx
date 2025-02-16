"use client";

import { Calendar, Plus, Save,ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { url } from "inspector";

// メニュー項目（階層構造対応）
const items = [
  {
    title: "ダッシュボード",
    url: "/",
    icon: Calendar,
  },
  {
    title: "収入印紙",
    icon: ChevronDown,
    children: [
      {
        title: "使用する",
        url: "/revenue-stamp/new",
        icon: Save,
      },
      {
        title: "追加する",
        url: "/revenue-stamp/add",
        icon: Plus,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="drop-shadow-sm w-64 bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <main className="my-2">
                {items.map((item) =>
                  item.children ? (
                    <Accordion key={item.title} type="single" collapsible defaultValue={item.title}>
                      <AccordionItem value={item.title}>
                        <AccordionTrigger className="flex items-center ml-2 gap-2 justify-start" style={{ textDecoration: 'none' }}>
                          <item.icon size={18} />
                          <span className="text-sm">{item.title}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul>
                            {item.children.map((child) => (
                              <li key={child.title}>
                                <SidebarMenuButton asChild>
                                  <a href={child.url} className="flex items-center gap-2 ml-3 w-full rounded hover:bg-gray-100">
                                    <child.icon size={16} />
                                    <span className="text-sm font-medium leading-none">{child.title}</span>
                                  </a>
                                </SidebarMenuButton>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2 w-full font-bold rounded hover:bg-gray-100" style={{ textDecoration: 'none' }}>
                          <item.icon size={18} />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </main>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
