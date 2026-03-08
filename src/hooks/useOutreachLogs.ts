import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

const ANON_USER_ID = "anon";

export function useOutreachLogs() {
  const [logs, setLogs] = useState<OutreachLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      .on("postgres_changes", { event: "*", schema: "public", table: "outreach_logs" }, () => {
        fetchLogs();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const addLog = async (log: Omit<OutreachLog, "id" | "user_id" | "created_at" | "last_outreach_at">) => {
    await supabase.from("outreach_logs").insert({ ...log, user_id: ANON_USER_ID });
  };

  const updateLog = async (id: string, updates: Partial<OutreachLog>) => {
    await supabase.from("outreach_logs").update(updates).eq("id", id);
  };

  return { logs, loading, addLog, updateLog };
}
