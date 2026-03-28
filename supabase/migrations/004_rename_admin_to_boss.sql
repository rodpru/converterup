-- Update is_admin() function to check for 'boss' role instead of 'admin'
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'boss'
  );
$$ language sql security definer stable;

-- Update any existing admin users to boss
update public.profiles set role = 'boss' where role = 'admin';
