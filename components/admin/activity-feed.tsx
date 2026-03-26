interface ActivityItem {
  timestamp: string;
  email: string;
  action: "signup" | "conversion" | "upgrade" | "cancel";
  detail: string;
}

const actionColors: Record<string, string> = {
  signup: "bg-[#2DD4BF]/10 text-[#2DD4BF]",
  conversion: "bg-[#7C3AED]/10 text-[#7C3AED]",
  upgrade: "bg-[#2DD4BF]/10 text-[#2DD4BF]",
  cancel: "bg-[#FB7185]/10 text-[#FB7185]",
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[#2A2535]">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
          Recent Activity
        </h3>
      </div>
      <div className="divide-y divide-[#2A2535]/50">
        {items.length === 0 && (
          <div className="px-5 py-8 text-center text-[#71717A] text-sm">
            No activity yet
          </div>
        )}
        {items.map((item, i) => (
          <div
            key={`${item.timestamp}-${item.email}-${i}`}
            className="px-5 py-3 flex items-center gap-4 hover:bg-[#1C1825] transition-colors"
          >
            <span className="font-mono text-[10px] text-[#71717A] w-16 shrink-0">
              {item.timestamp}
            </span>
            <span className="text-sm text-[#EDEDEF] truncate w-32">
              {item.email}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider ${actionColors[item.action]}`}
            >
              {item.action}
            </span>
            <span className="text-sm text-[#71717A] truncate flex-1">
              {item.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
