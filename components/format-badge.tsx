import { cn } from "@/lib/utils";

interface FormatBadgeProps {
  format: string;
  type?: "image" | "video" | "audio";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FormatBadge({
  format,
  type = "image",
  size = "md",
  active = false,
  onClick,
  className,
}: FormatBadgeProps) {
  const sizes = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  const typeStyles = {
    image: active
      ? "bg-[#2DD4BF]/20 text-[#2DD4BF] border-[#2DD4BF]/40"
      : "bg-[#2DD4BF]/5 text-[#2DD4BF]/70 border-[#2DD4BF]/20 hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF]/30",
    video: active
      ? "bg-[#FB7185]/20 text-[#FB7185] border-[#FB7185]/40"
      : "bg-[#FB7185]/5 text-[#FB7185]/70 border-[#FB7185]/20 hover:bg-[#FB7185]/10 hover:border-[#FB7185]/30",
    audio: active
      ? "bg-violet-500/20 text-violet-400 border-violet-500/40"
      : "bg-violet-500/5 text-violet-400/70 border-violet-500/20 hover:bg-violet-500/10 hover:border-violet-500/30",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "inline-flex items-center justify-center border rounded-full font-mono uppercase tracking-wider transition-all duration-200",
        sizes[size],
        typeStyles[type],
        onClick && "cursor-pointer min-h-[44px]",
        !onClick && "cursor-default",
        className,
      )}
    >
      {format}
    </button>
  );
}
