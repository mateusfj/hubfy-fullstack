"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

type ErrorStateProps = {
  title?: string;
  description?: string;
  invalidateQueries?: object;
};

export function ErrorState({
  title = "Algo deu errado",
  description = "Não foi possível carregar as informações. Tente novamente mais tarde.",
  invalidateQueries,
}: ErrorStateProps) {
  const queryClient = useQueryClient();
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex max-w-sm flex-col items-center gap-4 bg-background p-6 text-center">
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full bg-destructive/10
            text-destructive
          "
        >
          <AlertTriangle size={24} />
        </div>

        <div className="space-y-1">
          <h2 className="text-base font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {invalidateQueries && (
          <Button
            variant="outline"
            size="sm"
            className="mt-2 gap-2"
            onClick={() => {
              queryClient.invalidateQueries(invalidateQueries);
            }}
          >
            <RefreshCcw size={14} />
            Tentar novamente
          </Button>
        )}
      </div>
    </div>
  );
}
