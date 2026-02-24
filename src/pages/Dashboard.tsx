import { useState, useMemo } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SourcingTab } from "@/components/dashboard/SourcingTab";
import { ArchiveTab } from "@/components/dashboard/ArchiveTab";
import { InboxTab } from "@/components/dashboard/InboxTab";
import { ProfileTab } from "@/components/dashboard/ProfileTab";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Zap } from "lucide-react";
import { generateLeads, type Lead } from "@/lib/mock-data";
import { convertToCSV, downloadCSV, type ExportRow } from "@/lib/csv-utils";
import { useOutreachLogs } from "@/hooks/useOutreachLogs";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/hooks/useAuth";

const { jobs, ceos } = generateLeads();

export default function Dashboard() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<"Jobs" | "CEOs">("Jobs");
  const [activeTab, setActiveTab] = useState("Sourcing");
  const [search, setSearch] = useState("");
  const { logs, addLog, updateLog } = useOutreachLogs();
  const { profile, updateProfile } = useUserProfile();

  const currentLeads = activeView === "Jobs" ? jobs : ceos;
  const filteredLeads = currentLeads.filter(
    (l) =>
      l.entity.toLowerCase().includes(search.toLowerCase()) ||
      l.contact.toLowerCase().includes(search.toLowerCase())
  );

  const repository: (ExportRow & { id: string })[] = useMemo(() => {
    const contactedIds = new Set(logs.map((l) => l.target_id));

    const fromLogs = logs
      .filter((l) => l.main_category === activeView)
      .map((log) => ({
        id: log.id,
        entity: log.target_name,
        contact: log.contact_person,
        category: log.outreach_type,
        email: log.recipient_email,
        location: "Synced",
        metadata: activeView === "Jobs" ? log.salary : log.funding,
        model: log.model_used,
        status: `Contacted (S${log.followup_count})`,
        responseStatus: log.response_status,
      }));

    const fromNew = currentLeads
      .filter((l) => !contactedIds.has(l.id))
      .map((l) => ({
        id: l.id,
        entity: l.entity,
        contact: l.contact,
        category: l.category,
        email: l.email,
        location: l.location,
        metadata: activeView === "Jobs" ? l.salary : l.funding,
        model: activeView === "Jobs" ? "Direct" : l.model || "",
        status: "New",
        responseStatus: "N/A",
      }));

    return [...fromLogs, ...fromNew];
  }, [activeView, currentLeads, logs]);

  const handleOutreach = async (lead: Lead) => {
    if (!user) return;
    const subject =
      activeView === "Jobs"
        ? `Application: ${lead.category} at ${lead.entity}`
        : `Fractional Model Proposal: AI Governance for ${lead.entity}`;

    const body = `Hi,\n\nRegarding ${activeView === "Jobs" ? "the remote role" : "regulatory assistance"}.\n\nBio: ${profile?.linkedin_bio || ""}\n\nLinks:\n- Deck: ${profile?.deck_link || ""}\n- Profile: ${profile?.profile_link || ""}\n\nBest regards`;

    await addLog({
      target_id: lead.id,
      target_name: lead.entity,
      contact_person: lead.contact,
      recipient_email: lead.email,
      main_category: activeView,
      outreach_type: lead.category,
      salary: lead.salary || "",
      funding: lead.funding || "",
      model_used: lead.model || "Direct",
      followup_count: 1,
      response_status: "No Reply",
    });

    window.location.href = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleFollowUp = async (log: any) => {
    await updateLog(log.id, {
      followup_count: log.followup_count + 1,
      last_outreach_at: new Date().toISOString(),
    });
    const subject = `Follow-up (S${log.followup_count + 1}): ${log.target_name}`;
    window.location.href = `mailto:${log.recipient_email}?subject=${encodeURIComponent(subject)}`;
  };

  const handleExport = () => {
    const csv = convertToCSV(repository, activeView === "Jobs" ? "Job" : "CEO");
    downloadCSV(csv, `${activeView}_Archive.csv`);
  };

  const tabTitles: Record<string, string> = {
    Sourcing: activeView === "Jobs" ? "Remote FCCO / FCO Hunt" : "Regulatory CEO Outreach",
    Archive: "Master Archive",
    Inbox: "Response Hub",
    Profile: "Profile & Settings",
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar
          activeView={activeView}
          setActiveView={setActiveView}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onExport={handleExport}
        />
        <SidebarInset>
          {/* Top bar */}
          <header className="flex items-center gap-4 border-b border-border px-4 py-3 lg:px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground">{tabTitles[activeTab]}</h1>
            </div>
            <Badge variant="outline" className="gap-1.5 text-xs">
              <Zap className="h-3 w-3 text-success" /> Active
            </Badge>
            {(activeTab === "Sourcing" || activeTab === "Archive") && (
              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div className="flex-1 p-4 lg:p-6">
            {activeTab === "Sourcing" && (
              <SourcingTab leads={filteredLeads} activeView={activeView} onOutreach={handleOutreach} />
            )}
            {activeTab === "Archive" && (
              <ArchiveTab
                rows={repository.filter(
                  (r) =>
                    r.entity.toLowerCase().includes(search.toLowerCase()) ||
                    r.contact.toLowerCase().includes(search.toLowerCase())
                )}
                onUpdateResponse={(id, st) => updateLog(id, { response_status: st })}
              />
            )}
            {activeTab === "Inbox" && (
              <InboxTab
                logs={logs}
                activeView={activeView}
                onUpdateResponse={(id, st) => updateLog(id, { response_status: st })}
                onFollowUp={handleFollowUp}
              />
            )}
            {activeTab === "Profile" && (
              <ProfileTab profile={profile} onSave={updateProfile} />
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
