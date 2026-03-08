
-- Drop all existing open policies on outreach_logs
DROP POLICY IF EXISTS "Allow all delete on outreach_logs" ON public.outreach_logs;
DROP POLICY IF EXISTS "Allow all insert on outreach_logs" ON public.outreach_logs;
DROP POLICY IF EXISTS "Allow all select on outreach_logs" ON public.outreach_logs;
DROP POLICY IF EXISTS "Allow all update on outreach_logs" ON public.outreach_logs;

-- Drop all existing open policies on user_profiles
DROP POLICY IF EXISTS "Allow all insert on user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow all select on user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow all update on user_profiles" ON public.user_profiles;

-- Create auth-scoped policies for outreach_logs
CREATE POLICY "owner_select" ON public.outreach_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.outreach_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.outreach_logs FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.outreach_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Create auth-scoped policies for user_profiles
CREATE POLICY "owner_select" ON public.user_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.user_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.user_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
