import { SidebarTrigger } from "@/src/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle/ThemeToggle";

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 justify-between px-4 border-b bg-background rounded-t-2xl">
      <div className="flex items-center gap-2 ">
        <SidebarTrigger className="-ml-1 " />
      </div>
      <ThemeToggle />
    </header>
  );
};

export { Header };
