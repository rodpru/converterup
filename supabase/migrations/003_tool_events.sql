-- Tool usage tracking
create table public.tool_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade,
  tool_name text not null,
  event_type text not null, -- 'started' or 'completed'
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.tool_events enable row level security;

-- Users can insert their own events
create policy "Users can insert own tool events" on public.tool_events
  for insert with check (auth.uid() = user_id);

-- Admins can read all events
create policy "Admins can read all tool events" on public.tool_events
  for select using (public.is_admin());
