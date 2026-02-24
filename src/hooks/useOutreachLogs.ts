import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface OutreachLog {
  id: string;
  user_id: string;
  target_id: string;
  target_name: string;
  contact_person: string;
  recipient_email: string;
  main_category: string;
  outreach_type: string;
  salary: string;
  funding: string;
  model_used: string;
  followup_count: number;
  response_status: string;
  last_outreach_at: string;
  created_at: string;
}

export function useOutreachLogs() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<OutreachLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLogs([]); setLoading(false); return; }

    const fetchLogs = async () => {
      const { data } = await supabase
        .from("outreach_logs")
        .select("*")
        .order("created_at", { ascending: false });
      setLogs((data as OutreachLog[]) || []);
      setLoading(false);
    };
    fetchLogs();

    const channel = supabase
      .channel("outreach_logs_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "outreach_logs", filter: `user_id=eq.${user.id}` }, () => {
        fetchLogs();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const addLog = async (log: Omit<OutreachLog, "id" | "user_id" | "created_at" | "last_outreach_at">) => {
    if (!user) return;
    await supabase.from("outreach_logs").insert({ ...log, user_id: user.id });
  };

  const updateLog = async (id: string, updates: Partial<OutreachLog>) => {
    if (!user) return;
    await supabase.from("outreach_logs").update(updates).eq("id", id);
  };

  return { logs, loading, addLog, updateLog };
}
