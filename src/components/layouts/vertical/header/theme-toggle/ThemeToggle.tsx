"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Button } from "@/src/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={(): void => setTheme(theme === "light" ? "dark" : "light")}
            variant={"ghost"}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Alterar tema</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};

export { ThemeToggle };
