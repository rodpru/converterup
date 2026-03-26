-- Fix infinite recursion in admin RLS policies on profiles table
-- The admin policies were doing a subquery on profiles itself, causing recursion

-- Create a security definer function to check admin role without RLS
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Drop recursive policies
drop policy if exists "Admins can read all profiles" on public.profiles;
drop policy if exists "Admins can update all profiles" on public.profiles;
drop policy if exists "Admins can read all conversions" on public.conversions;
drop policy if exists "Admins can read subscription events" on public.subscription_events;

-- Recreate admin policies using the security definer function
create policy "Admins can read all profiles" on public.profiles for select
  using (public.is_admin());
create policy "Admins can update all profiles" on public.profiles for update
  using (public.is_admin());
create policy "Admins can read all conversions" on public.conversions for select
  using (public.is_admin());
create policy "Admins can read subscription events" on public.subscription_events for select
  using (public.is_admin());
