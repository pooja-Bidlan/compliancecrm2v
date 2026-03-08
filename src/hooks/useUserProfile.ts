import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface UserProfile {
  id: string;
  user_id: string;
  linkedin_bio: string;
  deck_link: string;
  profile_link: string;
  blog_link: string;
  outreach_email: string;
}

const ANON_USER_ID = "anon";

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from("user_profiles").select("*").eq("user_id", ANON_USER_ID).maybeSingle();
      setProfile(data as UserProfile | null);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;

    const { data, error } = await supabase.functions.invoke("validate-profile", {
      body: updates,
    });

    if (error) throw new Error(error.message || "Validation failed");
    if (data?.error) throw new Error(data.error);

    setProfile({ ...profile, ...updates });
  };

  return { profile, loading, updateProfile };
}
