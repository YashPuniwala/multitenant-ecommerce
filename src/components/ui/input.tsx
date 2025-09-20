import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex w-full min-w-0 rounded-xl border-2 bg-card px-4 py-3 text-sm transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "shadow-sm hover:shadow-md font-medium",
        className
      )}
      {...props}
    />
  );
}

export { Input };
