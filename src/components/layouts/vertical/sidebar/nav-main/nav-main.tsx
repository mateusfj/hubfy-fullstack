"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { MenuitemsType } from "@/src/lib/utils/constants/menu-items";

import { usePathname, useRouter } from "next/navigation";

interface Props {
  data: MenuitemsType[];
}

export function NavMain({ data }: Props) {
  const router = useRouter();
  const pathname: string = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {data.map((item: MenuitemsType) => {
          if (item.subheader) {
            return (
              <SidebarGroupLabel key={item.subheader}>
                {item.subheader}
              </SidebarGroupLabel>
            );
          } else {
            return (
              <SidebarMenuItem key={item.title}>
                <a
                  className="cursor-pointer"
                  onClick={() => router.push(item.href ?? "")}
                >
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    {item.title}
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
