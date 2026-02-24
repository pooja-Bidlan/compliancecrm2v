import { Briefcase, Users, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { OutreachLog } from "@/hooks/useOutreachLogs";

interface InboxTabProps {
  logs: OutreachLog[];
  activeView: "Jobs" | "CEOs";
  onUpdateResponse: (id: string, status: string) => void;
  onFollowUp: (log: OutreachLog) => void;
}

export function InboxTab({ logs, activeView, onUpdateResponse, onFollowUp }: InboxTabProps) {
  const filtered = logs.filter((l) => l.main_category === activeView);
  const statuses = ["No Reply", "Replied", "Meeting Set"] as const;

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg font-semibold">No outreach yet</p>
        <p className="text-sm">Contacts you reach out to will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filtered.map((log) => (
        <Card key={log.id} className="border-border">
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted shrink-0">
                {activeView === "Jobs" ? <Briefcase className="h-5 w-5 text-primary" /> : <Users className="h-5 w-5 text-success" />}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground truncate">{log.target_name}</p>
                <p className="text-xs text-muted-foreground">
                  Stage {log.followup_count} · {new Date(log.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {statuses.map((st) => (
                <Button
                  key={st}
                  size="sm"
                  variant={log.response_status === st ? "default" : "outline"}
                  className="text-xs h-8"
                  onClick={() => onUpdateResponse(log.id, st)}
                >
                  {st}
                </Button>
              ))}
              <Button size="sm" variant="ghost" className="h-8" onClick={() => onFollowUp(log)}>
                <RefreshCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
