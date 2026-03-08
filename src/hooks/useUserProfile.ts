import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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
    if (!user) { setLoading(false); return; }
    const fetchProfile = async () => {
      const { data } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).maybeSingle();
      setProfile(data as UserProfile | null);
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile || !user) return;

    const { data, error } = await supabase.functions.invoke("validate-profile", {
      body: updates,
    });

    if (error) throw new Error(error.message || "Validation failed");
    if (data?.error) throw new Error(data.error);

    setProfile({ ...profile, ...updates });
  };

  return { profile, loading, updateProfile };
}
