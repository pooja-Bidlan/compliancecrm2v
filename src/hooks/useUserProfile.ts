import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface UserProfile {
  id: string;
  user_id: string;
  linkedin_bio: string;
  deck_link: string;
  profile_link: string;
  blog_link: string;
  outreach_email: string;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setProfile(null); setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).maybeSingle();
      setProfile(data as UserProfile | null);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;
    await supabase.from("user_profiles").update(updates).eq("id", profile.id);
    setProfile({ ...profile, ...updates });
  };

  return { profile, loading, updateProfile };
}
