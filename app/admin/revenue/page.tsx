import { KpiCard } from "@/components/admin/kpi-card";
import { DollarSign } from "lucide-react";

export default function AdminRevenuePage() {
  const kpis = [
    {
      label: "MRR",
      value: "$0",
      delta: { value: "+$0 this month", positive: true },
    },
    {
      label: "Total Revenue",
      value: "$0",
      delta: { value: "all time", positive: true },
    },
    {
      label: "Active Subscribers",
      value: "0",
      delta: { value: "+0 this month", positive: true },
    },
    {
      label: "Churn Rate",
      value: "0%",
      delta: { value: "vs 0% last month", positive: true },
    },
    {
      label: "ARPU",
      value: "$0",
      delta: { value: "avg revenue per user", positive: true },
    },
    {
      label: "LTV",
      value: "$0",
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
                <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A] hidden sm:table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-[#71717A] text-sm"
                >
                  <div className="flex flex-col items-center gap-3">
                    <DollarSign className="w-8 h-8 text-[#2A2535]" />
                    <span>No transactions yet. Revenue will appear here once users subscribe.</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
