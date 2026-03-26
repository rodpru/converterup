export function UserBadge({
  status,
}: {
  status: "free" | "active" | "cancelled";
}) {
  const styles = {
    free: "border border-[#2A2535] text-[#71717A]",
    active: "bg-[#2DD4BF]/10 text-[#2DD4BF] border border-[#2DD4BF]/20",
    cancelled: "bg-[#FB7185]/10 text-[#FB7185] border border-[#FB7185]/20",
  };
  const labels = { free: "FREE", active: "PRO", cancelled: "CANCELLED" };

  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
