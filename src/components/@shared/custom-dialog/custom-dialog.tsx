"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { ScrollArea } from "../../ui/scroll-area";

interface CustomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  beforeContent?: React.ReactNode;
}

const CustomDialog = ({
  open,
  onOpenChange,
  title,
  description,
  content,
  footer,
  className,
  beforeContent,
}: CustomDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {beforeContent}
      <DialogContent className={`p-0 gap-0 ${className ?? ""}`}>
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <ScrollArea className="max-h-[90vh]">
          {content}
          {footer && (
            <DialogFooter className="px-4 pb-4">{footer}</DialogFooter>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export { CustomDialog };
