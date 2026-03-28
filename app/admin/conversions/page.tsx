import { getConversions } from "@/lib/admin";
import { AdminConversionsClient } from "./client";

export default async function AdminConversionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const type = (params.type ?? "all") as "all" | "images" | "videos" | "audio";
  const search = params.search ?? "";
  const page = Number(params.page ?? "1");

  const data = await getConversions({ type, search, page, limit: 25 });

  return (
    <AdminConversionsClient
      conversions={data.conversions}
      total={data.total}
      page={data.page}
      limit={data.limit}
      currentType={type}
      currentSearch={search}
    />
  );
}
