"use client";

import { Plus } from "lucide-react";
import { Button } from "../../ui/button";

interface PageHeaderProps {
  description: string;
  title: string;
  onClick?: () => void;
  buttonText?: string;
}

const PageHeader = ({
  description,
  title,
  onClick,
  buttonText = "Adicionar",
}: PageHeaderProps) => {
  return (
    <div className="flex items-center  justify-between md:flex-row flex-col gap-4">
      <div className="w-full md:w-auto">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {onClick && (
        <Button className="w-full md:w-auto" onClick={onClick}>
          <Plus />
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export { PageHeader };
