import { getUsers } from "@/lib/admin";
import { AdminUsersClient } from "./client";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    filter?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const filter = (params.filter ?? "all") as
    | "all"
    | "free"
    | "active"
    | "cancelled";
  const search = params.search ?? "";
  const page = Number(params.page ?? "1");

  const data = await getUsers({ filter, search, page, limit: 25 });

  return (
    <AdminUsersClient
      users={data.users}
      total={data.total}
      page={data.page}
      limit={data.limit}
      currentFilter={filter}
      currentSearch={search}
    />
  );
}
