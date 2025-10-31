import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-headline text-xl font-bold text-foreground", className)}>
      <div className="p-2 rounded-lg">
        <Briefcase className="h-5 w-5 text-primary" />
      </div>
      <span>
        CorporateIntern
      </span>
    </div>
  );
}
