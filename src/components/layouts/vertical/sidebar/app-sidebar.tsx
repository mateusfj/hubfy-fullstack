"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/src/components/ui/sidebar";

import { NavMain } from "./nav-main/nav-main";
import { NavUser } from "./nav-user/nav-user";
import { MenuItems } from "@/src/lib/utils/constants/menu-items";
import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="w-full flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="Hubfy Fullstack"
            width={150}
            height={40}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain data={MenuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
