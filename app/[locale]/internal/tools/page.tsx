import { getToolStats } from "@/lib/admin";
import { Wrench } from "lucide-react";

export default async function AdminToolsPage() {
  const stats = await getToolStats();

  const maxStarted = stats.length > 0 ? stats[0].started : 1;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[Syne] font-bold text-2xl text-[#EDEDEF]">Tools</h1>
        <p className="text-sm text-[#71717A] mt-1">
          Tool usage analytics and conversion rates.
        </p>
      </div>

      {stats.length === 0 ? (
        <div className="bg-[#16131E] border border-[#2A2535] rounded-xl p-12 text-center">
          <Wrench className="w-8 h-8 text-[#2A2535] mx-auto mb-3" />
          <p className="text-[#71717A] text-sm">
            No tool usage data yet. Events will appear here as users interact
            with tools.
          </p>
        </div>
      ) : (
        <>
          {/* Visual bar chart */}
          <div className="space-y-3 mb-8">
            {stats.map((tool) => (
              <div
                key={tool.toolName}
                className="bg-[#16131E] border border-[#2A2535] rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-[#EDEDEF]">
                    {tool.toolName}
                  </span>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-[#71717A]">
                      {tool.started} started
                    </span>
                    <span className="text-[#2DD4BF]">
                      {tool.completed} completed
                    </span>
                    <span
                      className={
                        tool.conversionRate >= 80
                          ? "text-[#2DD4BF]"
                          : tool.conversionRate >= 50
                            ? "text-[#FACC15]"
                            : "text-[#FB7185]"
                      }
                    >
                      {tool.conversionRate}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-[#2A2535] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2DD4BF]/60 rounded-full transition-all"
                    style={{
                      width: `${maxStarted > 0 ? (tool.started / maxStarted) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="h-1.5 bg-[#2A2535] rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-[#2DD4BF] rounded-full transition-all"
                    style={{
                      width: `${tool.started > 0 ? (tool.completed / tool.started) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Data table */}
          <div className="bg-[#16131E] border border-[#2A2535] rounded-xl overflow-hidden overflow-x-auto">
            <div className="px-5 py-3 border-b border-[#2A2535]">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                Tool Breakdown
              </h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2535]">
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                    Tool Name
                  </th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                    Started
                  </th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                    Completed
                  </th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-[#71717A]">
                    Conversion Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.map((tool) => (
                  <tr
                    key={tool.toolName}
                    className="border-b border-[#2A2535]/50 hover:bg-[#1C1825] transition-colors"
                  >
                    <td className="px-5 py-3 font-mono text-sm text-[#EDEDEF]">
                      {tool.toolName}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm text-[#71717A]">
                      {tool.started.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm text-[#2DD4BF]">
                      {tool.completed.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`font-mono text-sm ${
                          tool.conversionRate >= 80
                            ? "text-[#2DD4BF]"
                            : tool.conversionRate >= 50
                              ? "text-[#FACC15]"
                              : "text-[#FB7185]"
                        }`}
                      >
                        {tool.conversionRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
