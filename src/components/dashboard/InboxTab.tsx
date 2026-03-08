import { Briefcase, Users, RefreshCcw, Linkedin } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
        <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
          <Inbox className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-lg font-semibold">No outreach yet</p>
        <p className="text-sm mt-1">Contacts you reach out to will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filtered.map((log) => (
        <Card key={log.id} className="border-border/60 rounded-xl hover:shadow-sm transition-all duration-200">
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${activeView === "Jobs" ? "bg-primary/10" : "bg-success/10"}`}>
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
              <a
                href={`https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(log.contact_person + " " + log.target_name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                title="Find on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              {statuses.map((st) => (
                <Button
                  key={st}
                  size="sm"
                  variant={log.response_status === st ? "default" : "outline"}
                  className="text-xs h-8 rounded-lg"
                  onClick={() => onUpdateResponse(log.id, st)}
                >
                  {st}
                </Button>
              ))}
              <Button size="sm" variant="ghost" className="h-8 rounded-lg hover:bg-primary/5" onClick={() => onFollowUp(log)}>
                <RefreshCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Re-import for empty state
import { Inbox } from "lucide-react";
