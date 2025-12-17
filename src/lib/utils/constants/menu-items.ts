import { Home, LucideIcon } from "lucide-react";

export interface MenuitemsType {
  href?: string;
  icon?: LucideIcon;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
}

const MenuItems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Painel Geral",
  },
  {
    href: "/",
    icon: Home,
    id: String(Math.random()),
    title: "Dashboard",
  },
];

export { MenuItems };
