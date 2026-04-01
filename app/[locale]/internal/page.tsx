import { KpiCard } from "@/components/admin/kpi-card";
import { ActivityFeed } from "@/components/admin/activity-feed";
import { getOverviewData } from "@/lib/admin";

export default async function AdminOverviewPage() {
  const data = await getOverviewData();

  const kpis = [
    {
      label: "Total Users",
      value: data.totalUsers.toLocaleString(),
      delta: { value: `${data.activeSubscribers} subscribers`, positive: true },
    },
    {
      label: "Active Subscribers",
      value: data.activeSubscribers.toLocaleString(),
      delta: {
        value:
          data.totalUsers > 0
            ? `${Math.round((data.activeSubscribers / data.totalUsers) * 100)}% of total`
            : "0% of total",
        positive: data.activeSubscribers > 0,
      },
    },
    {
      label: "Revenue",
      value: `$${(data.revenue / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      delta: { value: "all time", positive: true },
    },
    {
      label: "Total Conversions",
      value: data.totalConversions.toLocaleString(),
      delta: { value: "all time", positive: true },
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

      <ActivityFeed items={data.recentActivity} />
    </div>
  );
}
