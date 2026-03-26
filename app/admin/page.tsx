import { KpiCard } from "@/components/admin/kpi-card";
import { ActivityFeed } from "@/components/admin/activity-feed";

export default function AdminOverviewPage() {
  const kpis = [
    {
      label: "Total Users",
      value: "0",
      delta: { value: "+0 this week", positive: true },
    },
    {
      label: "Active Users (7d)",
      value: "0",
      delta: { value: "0% of total", positive: true },
    },
    {
      label: "MRR",
      value: "$0",
      delta: { value: "+$0 this month", positive: true },
    },
    {
      label: "Conversions Today",
      value: "0",
      delta: { value: "vs 0 avg", positive: true },
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[Syne] font-bold text-2xl text-[#EDEDEF]">
          Overview
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Dashboard metrics and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <ActivityFeed items={[]} />
    </div>
  );
}
