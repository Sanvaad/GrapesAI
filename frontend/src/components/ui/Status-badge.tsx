// src/components/ui/status-badge.tsx
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info";
  text: string;
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-green-100 text-green-800": status === "success",
          "bg-yellow-100 text-yellow-800": status === "warning",
          "bg-red-100 text-red-800": status === "error",
          "bg-blue-100 text-blue-800": status === "info",
        },
      )}
    >
      <span
        className={cn("mr-1 h-1.5 w-1.5 rounded-full", {
          "bg-green-400": status === "success",
          "bg-yellow-400": status === "warning",
          "bg-red-400": status === "error",
          "bg-blue-400": status === "info",
        })}
      />
      {text}
    </span>
  );
}
