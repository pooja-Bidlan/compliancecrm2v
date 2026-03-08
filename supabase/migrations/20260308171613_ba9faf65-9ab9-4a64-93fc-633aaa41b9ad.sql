-- Drop existing auth-based policies
DROP POLICY IF EXISTS "Users can view own logs" ON public.outreach_logs;
DROP POLICY IF EXISTS "Users can insert own logs" ON public.outreach_logs;
DROP POLICY IF EXISTS "Users can update own logs" ON public.outreach_logs;
DROP POLICY IF EXISTS "Users can delete own logs" ON public.outreach_logs;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

-- Create open policies for public access
CREATE POLICY "Allow all select on outreach_logs" ON public.outreach_logs FOR SELECT USING (true);
CREATE POLICY "Allow all insert on outreach_logs" ON public.outreach_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update on outreach_logs" ON public.outreach_logs FOR UPDATE USING (true);
CREATE POLICY "Allow all delete on outreach_logs" ON public.outreach_logs FOR DELETE USING (true);

CREATE POLICY "Allow all select on user_profiles" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Allow all insert on user_profiles" ON public.user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update on user_profiles" ON public.user_profiles FOR UPDATE USING (true);