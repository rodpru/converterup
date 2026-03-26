import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
}

export function KpiCard({ label, value, delta }: KpiCardProps) {
  return (
    <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-5">
      <p className="font-mono text-[10px] uppercase tracking-wider text-[#71717A] mb-3">
        {label}
      </p>
      <p className="font-[Syne] font-bold text-2xl sm:text-3xl text-[#EDEDEF] mb-1">
        {value}
      </p>
      {delta && (
        <div
          className={`flex items-center gap-1 text-xs font-mono ${
            delta.positive ? "text-[#2DD4BF]" : "text-[#FB7185]"
          }`}
        >
          {delta.positive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {delta.value}
        </div>
      )}
    </div>
  );
}
