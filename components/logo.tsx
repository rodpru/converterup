import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center aspect-square select-none",
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
        </defs>
        {/* Input rectangle — filled with gradient */}
        <rect
          x="4"
          y="6"
          width="14"
          height="20"
          rx="2"
          fill="url(#logo-gradient)"
        />
        {/* Output rectangle — outline, rotated */}
        <rect
          x="14"
          y="6"
          width="14"
          height="20"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
          transform="rotate(8 21 16)"
        />
      </svg>
    </div>
  );
}
