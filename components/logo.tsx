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
          <linearGradient
            id="logo-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
        </defs>
        <rect
          x="5"
          y="6"
          width="14"
          height="20"
          rx="2"
          fill="url(#logo-gradient)"
        />
        <rect
          x="13"
          y="6"
          width="14"
          height="20"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.35"
          transform="rotate(8 20 16)"
        />
        <path
          d="M14.5 16l2.5 2.5 2.5-2.5"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="17"
          y1="12.5"
          x2="17"
          y2="18.5"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
