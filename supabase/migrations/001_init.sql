-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text not null default 'user',
  daily_conversions integer not null default 0,
  last_conversion_date date not null default current_date,
  subscription_status text not null default 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_start timestamptz,
  subscription_end timestamptz,
  total_conversions integer not null default 0,
  total_paid integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Conversions log
create table public.conversions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  input_format text not null,
  output_format text not null,
  input_size bigint not null,
  output_size bigint,
  duration_ms integer,
  conversion_type text not null default 'format',
  status text not null default 'completed',
  created_at timestamptz not null default now()
);

-- Subscription events
create table public.subscription_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  event_type text not null,
  stripe_event_id text unique,
  amount integer,
  created_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.conversions enable row level security;
alter table public.subscription_events enable row level security;

-- User policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view own conversions" on public.conversions for select using (auth.uid() = user_id);
create policy "Users can insert own conversions" on public.conversions for insert with check (auth.uid() = user_id);

-- Admin policies
create policy "Admins can read all profiles" on public.profiles for select
  using (auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Admins can update all profiles" on public.profiles for update
  using (auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Admins can read all conversions" on public.conversions for select
  using (auth.uid() in (select id from public.profiles where role = 'admin'));
create policy "Admins can read subscription events" on public.subscription_events for select
  using (auth.uid() in (select id from public.profiles where role = 'admin'));
