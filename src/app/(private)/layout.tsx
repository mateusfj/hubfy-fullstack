import type { Metadata } from "next";
import { AppSidebar } from "@/src/components/layouts/vertical/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { Header } from "@/src/components/layouts/vertical/header/header";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="@container/main flex flex-1 flex-col p-4 overflow-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
