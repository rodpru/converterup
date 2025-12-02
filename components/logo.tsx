import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex items-center justify-center aspect-square select-none", className)}>
            <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Blade: Sharp, Geometric - Uses the Primary Brand Color (Teal) */}
                {/* Represents precision and cutting */}
                <path
                    d="M11 12V3C11 3 18 1 21 12H11Z"
                    style={{ fill: "var(--primary)" }}
                />

                {/* Handle: Solid Block - Uses the Accent Color (Burnt Orange) */}
                {/* Represents the tool/utility aspect */}
                <rect
                    x="11"
                    y="12"
                    width="10"
                    height="17"
                    style={{ fill: "var(--accent)" }}
                />

                {/* Pivot Joint: Mechanical detail */}
                <circle 
                    cx="16" 
                    cy="12" 
                    r="1.5" 
                    className="fill-background stroke-foreground" 
                    strokeWidth="1" 
                />

                {/* Retro Grip Lines: Subtle texture */}
                <rect x="14" y="17" width="1" height="8" className="fill-foreground/20" />
                <rect x="17" y="17" width="1" height="8" className="fill-foreground/20" />
            </svg>
        </div>
    );
}
