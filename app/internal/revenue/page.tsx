import { KpiCard } from "@/components/admin/kpi-card";
import { getRevenue } from "@/lib/admin";
import { DollarSign } from "lucide-react";

export default async function AdminRevenuePage() {
  const data = await getRevenue();

  const kpis = [
    {
      label: "MRR",
      value: `$${(data.mrr / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      delta: {
        value: `${data.activeSubscribers} active subscribers`,
        positive: true,
      },
    },
    {
      label: "Total Revenue",
      value: `$${(data.totalRevenue / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      delta: { value: "all time", positive: true },
    },
    {
      label: "Active Subscribers",
      value: data.activeSubscribers.toLocaleString(),
      delta: { value: "current", positive: data.activeSubscribers > 0 },
    },
    {
      label: "Churn Rate",
      value: `${data.churnRate}%`,
      delta: {
        value: "cancelled / total subscribed",
        positive: data.churnRate < 10,
      },
    },
    {
      label: "ARPU",
      value: `$${(data.arpu / 100).toFixed(2)}`,
      delta: { value: "avg revenue per user", positive: true },
    },
    {
      label: "LTV",
      value: `$${(data.ltv / 100).toFixed(2)}`,
      delta: { value: "estimated lifetime value", positive: true },
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[Syne] font-bold text-2xl text-[#EDEDEF]">
          Revenue
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Subscription metrics and transaction history.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2A2535]">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
            Recent Transactions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2535]">
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                  Date
                </th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                  User
                </th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                  Type
                </th>
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-[#71717A] text-sm"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <DollarSign className="w-8 h-8 text-[#2A2535]" />
                      <span>
                        No transactions yet. Revenue will appear here once users
                        subscribe.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                data.transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-[#2A2535]/50 hover:bg-[#1C1825] transition-colors"
                  >
                    <td className="px-5 py-3 text-sm text-[#71717A] whitespace-nowrap">
                      {new Date(tx.created_at).toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-sm text-[#EDEDEF] truncate max-w-[200px]">
                      {tx.email}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider ${
                          tx.event_type === "subscribed"
                            ? "bg-[#2DD4BF]/10 text-[#2DD4BF]"
                            : tx.event_type === "cancelled"
                              ? "bg-[#FB7185]/10 text-[#FB7185]"
                              : "border border-[#2A2535] text-[#71717A]"
                        }`}
                      >
                        {tx.event_type}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-sm text-[#EDEDEF]">
                      ${(tx.amount / 100).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
