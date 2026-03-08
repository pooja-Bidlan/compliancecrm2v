import { useState, useMemo, useTransition } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar, type ViewMode } from "@/components/AppSidebar";
import { SourcingTab } from "@/components/dashboard/SourcingTab";
import { ArchiveTab } from "@/components/dashboard/ArchiveTab";
import { InboxTab } from "@/components/dashboard/InboxTab";
import { ProfileTab } from "@/components/dashboard/ProfileTab";
import { EnrichedTable } from "@/components/dashboard/EnrichedTable";
import { BFSITable } from "@/components/dashboard/BFSITable";
import { CoachingTable } from "@/components/dashboard/CoachingTable";
import { CeoTable } from "@/components/dashboard/CeoTable";
import { MarketIntelTable } from "@/components/dashboard/MarketIntelTable";
import { LawyersTable } from "@/components/dashboard/LawyersTable";
import { RemoteJobsTable } from "@/components/dashboard/RemoteJobsTable";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { generateLeads, type Lead } from "@/lib/mock-data";
import { generateEnrichedCompanies, ENRICHED_COLUMNS, type EnrichedCompany } from "@/lib/enriched-data";
import { generateBFSICompanies, BFSI_COLUMNS, type BFSICompany } from "@/lib/bfsi-data";
import { generateCoachingCompanies, COACHING_COLUMNS, type CoachingCompany } from "@/lib/coaching-data";
import { generateFundedCEOs, CEO_COLUMNS, type FundedCEO } from "@/lib/ceo-data";
import { generateMarketIntel, MARKET_INTEL_COLUMNS, type MarketIntelProspect } from "@/lib/market-intel-data";
import { generateLawyersPanIndia, generateLawyersDelhiNCR, LAWYER_COLUMNS, type LawyerProspect } from "@/lib/lawyers-data";
import { generateRemoteJobs, REMOTE_JOB_COLUMNS, type RemoteJob } from "@/lib/remote-jobs-data";
import { convertToCSV, convertEnrichedToCSV, downloadCSV, type ExportRow } from "@/lib/csv-utils";
import { useOutreachLogs } from "@/hooks/useOutreachLogs";
import { useUserProfile } from "@/hooks/useUserProfile";

const { jobs, ceos } = generateLeads();

// Lazy-generate enriched data only when needed
let _saasCompanies: EnrichedCompany[] | null = null;
let _aiCompanies: EnrichedCompany[] | null = null;
let _bfsiCompanies: BFSICompany[] | null = null;
let _coachingCompanies: CoachingCompany[] | null = null;
let _ceoCompanies: FundedCEO[] | null = null;
let _marketIntel: MarketIntelProspect[] | null = null;
let _lawyersPanIndia: LawyerProspect[] | null = null;
let _lawyersDelhi: LawyerProspect[] | null = null;
let _remoteJobs: RemoteJob[] | null = null;
function getSaasCompanies() {
  if (!_saasCompanies) _saasCompanies = generateEnrichedCompanies("SaaS");
  return _saasCompanies;
}
function getAiCompanies() {
  if (!_aiCompanies) _aiCompanies = generateEnrichedCompanies("AI");
  return _aiCompanies;
}
function getBfsiCompanies() {
  if (!_bfsiCompanies) _bfsiCompanies = generateBFSICompanies();
  return _bfsiCompanies;
}
function getCoachingCompanies() {
  if (!_coachingCompanies) _coachingCompanies = generateCoachingCompanies();
  return _coachingCompanies;
}
function getCeoCompanies() {
  if (!_ceoCompanies) _ceoCompanies = generateFundedCEOs();
  return _ceoCompanies;
}
function getMarketIntel() {
  if (!_marketIntel) _marketIntel = generateMarketIntel();
  return _marketIntel;
}
function getLawyersPanIndia() {
  if (!_lawyersPanIndia) _lawyersPanIndia = generateLawyersPanIndia();
  return _lawyersPanIndia;
}
function getLawyersDelhi() {
  if (!_lawyersDelhi) _lawyersDelhi = generateLawyersDelhiNCR();
  return _lawyersDelhi;
}
function getRemoteJobs() {
  if (!_remoteJobs) _remoteJobs = generateRemoteJobs();
  return _remoteJobs;
}

export default function Dashboard() {
  const [activeView, setActiveView] = useState<ViewMode>("Jobs");
  const [activeTab, setActiveTab] = useState("Sourcing");
  const [search, setSearch] = useState("");
  const { logs, addLog, updateLog } = useOutreachLogs();
  const { profile, updateProfile } = useUserProfile();

  const isEnrichedMode = activeView === "SaaS" || activeView === "AI" || activeView === "BFSI" || activeView === "Coaching" || activeView === "CEOs" || activeView === "MarketIntel" || activeView === "Lawyers" || activeView === "LawyersDelhi" || activeView === "Jobs";

  const enrichedCompanies = useMemo(() => {
    if (activeView === "SaaS") return getSaasCompanies();
    if (activeView === "AI") return getAiCompanies();
    return [];
  }, [activeView]);

  const bfsiCompanies = useMemo(() => {
    if (activeView === "BFSI") return getBfsiCompanies();
    return [];
  }, [activeView]);

  const coachingCompanies = useMemo(() => {
    if (activeView === "Coaching") return getCoachingCompanies();
    return [];
  }, [activeView]);

  const ceoCompanies = useMemo(() => {
    if (activeView === "CEOs") return getCeoCompanies();
    return [];
  }, [activeView]);

  const marketIntel = useMemo(() => {
    if (activeView === "MarketIntel") return getMarketIntel();
    return [];
  }, [activeView]);

  const lawyersPanIndia = useMemo(() => {
    if (activeView === "Lawyers") return getLawyersPanIndia();
    return [];
  }, [activeView]);

  const lawyersDelhi = useMemo(() => {
    if (activeView === "LawyersDelhi") return getLawyersDelhi();
    return [];
  }, [activeView]);

  const remoteJobs = useMemo(() => {
    if (activeView === "Jobs") return getRemoteJobs();
    return [];
  }, [activeView]);

  const currentLeads = activeView === "Jobs" ? jobs : activeView === "CEOs" ? [] as Lead[] : ceos;
  const filteredLeads = currentLeads.filter(
    (l) =>
      l.entity.toLowerCase().includes(search.toLowerCase()) ||
      l.contact.toLowerCase().includes(search.toLowerCase())
  );

  const repository: (ExportRow & { id: string })[] = useMemo(() => {
    if (isEnrichedMode) return [];
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
  }, [activeView, currentLeads, logs, isEnrichedMode]);

  const handleOutreach = async (lead: Lead) => {
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
    if (activeView === "BFSI") {
      const csv = convertGenericCSV(bfsiCompanies, BFSI_COLUMNS);
      downloadCSV(csv, `BFSI_Companies_Full.csv`);
    } else if (activeView === "Coaching") {
      const csv = convertGenericCSV(coachingCompanies, COACHING_COLUMNS);
      downloadCSV(csv, `Coaching_Companies_Full.csv`);
    } else if (activeView === "CEOs") {
      const csv = convertGenericCSV(ceoCompanies, CEO_COLUMNS as { key: string; label: string }[]);
      downloadCSV(csv, `Funded_CEOs_Full.csv`);
    } else if (activeView === "MarketIntel") {
      const csv = convertGenericCSV(marketIntel, MARKET_INTEL_COLUMNS as { key: string; label: string }[]);
      downloadCSV(csv, `Market_Intelligence_Full.csv`);
    } else if (activeView === "Lawyers") {
      const csv = convertGenericCSV(lawyersPanIndia, LAWYER_COLUMNS as { key: string; label: string }[]);
      downloadCSV(csv, `Lawyers_PanIndia_Full.csv`);
    } else if (activeView === "LawyersDelhi") {
      const csv = convertGenericCSV(lawyersDelhi, LAWYER_COLUMNS as { key: string; label: string }[]);
      downloadCSV(csv, `Lawyers_DelhiNCR_Full.csv`);
    } else if (isEnrichedMode) {
      const csv = convertEnrichedToCSV(enrichedCompanies, ENRICHED_COLUMNS);
      downloadCSV(csv, `${activeView}_Companies_Full.csv`);
    } else {
      const csv = convertToCSV(repository, activeView === "Jobs" ? "Job" : "CEO");
      downloadCSV(csv, `${activeView}_Archive.csv`);
    }
  };

  function convertGenericCSV(data: any[], columns: { key: string; label: string }[]) {
    if (!data.length) return "";
    const headers = columns.map((c) => c.label);
    const rows = data.map((row: any) =>
      columns.map((c) => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(",")
    );
    return `${headers.join(",")}\n${rows.join("\n")}`;
  }

  const tabTitles: Record<string, string> = {
    Sourcing: isEnrichedMode
      ? activeView === "SaaS" ? "SaaS Companies Database"
        : activeView === "AI" ? "AI Companies Database"
        : activeView === "BFSI" ? "BFSI Companies Database"
        : activeView === "CEOs" ? "Funded CEOs Database"
        : activeView === "MarketIntel" ? "Market Intelligence"
        : activeView === "Lawyers" ? "Lawyers & Advocates (Pan-India)"
        : activeView === "LawyersDelhi" ? "Lawyers & Advocates (Delhi NCR)"
        : "Coaching Institutes Database"
      : activeView === "Jobs" ? "Remote FCCO / FCO Hunt" : "Regulatory CEO Outreach",
    Archive: "Master Archive",
    Inbox: "Response Hub",
    Profile: "Profile & Settings",
  };

  const tabDescriptions: Record<string, string> = {
    Sourcing: isEnrichedMode
      ? activeView === "SaaS"
        ? "10,000 SaaS companies with 50+ employees — enriched with 26 data columns"
        : activeView === "AI"
        ? "5,000 global AI companies with 50+ employees — enriched with 26 data columns"
        : activeView === "BFSI"
        ? "80,000 India BFSI companies — Banks, FinTechs, NBFCs, SFBs, Insurance — enriched with 26 columns"
        : activeView === "CEOs"
        ? "20,000 funded CEOs globally — enriched with 26 columns including company native country"
        : activeView === "MarketIntel"
        ? "5,000 prospects — new appointments, board & director changes — enriched with 26 columns"
        : activeView === "Lawyers"
        ? "100,000 practicing lawyers & advocate firms across India (excl. Delhi NCR) — sell LegalTech API access"
        : activeView === "LawyersDelhi"
        ? "80,000 practicing lawyers & advocate firms in Delhi NCR — sell LegalTech API access"
        : "40,000 coaching institutes in India — enriched with 26 columns"
      : activeView === "Jobs" ? "Browse and apply to remote compliance roles" : "Discover funded CEOs for fractional engagements",
    Archive: "Track all your outreach activity in one place",
    Inbox: "Manage responses and follow-ups",
    Profile: "Configure your outreach profile and templates",
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
          <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-background/80 backdrop-blur-xl px-4 py-4 lg:px-8">
            <SidebarTrigger />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-foreground tracking-tight">{tabTitles[activeTab]}</h1>
              <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{tabDescriptions[activeTab]}</p>
            </div>
            <Badge variant="outline" className="gap-1.5 text-xs rounded-full px-3 py-1 border-success/30 bg-success/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              Active
            </Badge>
            {!isEnrichedMode && (activeTab === "Sourcing" || activeTab === "Archive") && (
              <div className="relative w-64 hidden md:block">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 rounded-lg bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-all"
                />
              </div>
            )}
          </header>

          <div className="flex-1 p-4 lg:p-8">
            <div key={`${activeTab}-${activeView}`} className="animate-fade-in">
              {activeTab === "Sourcing" && activeView === "BFSI" && (
                <BFSITable companies={bfsiCompanies} />
              )}
              {activeTab === "Sourcing" && activeView === "Coaching" && (
                <CoachingTable companies={coachingCompanies} />
              )}
              {activeTab === "Sourcing" && activeView === "CEOs" && (
                <CeoTable companies={ceoCompanies} />
              )}
              {activeTab === "Sourcing" && activeView === "MarketIntel" && (
                <MarketIntelTable companies={marketIntel} />
              )}
              {activeTab === "Sourcing" && activeView === "Lawyers" && (
                <LawyersTable companies={lawyersPanIndia} variant="pan-india" />
              )}
              {activeTab === "Sourcing" && activeView === "LawyersDelhi" && (
                <LawyersTable companies={lawyersDelhi} variant="delhi-ncr" />
              )}
              {activeTab === "Sourcing" && isEnrichedMode && activeView !== "BFSI" && activeView !== "Coaching" && activeView !== "CEOs" && activeView !== "MarketIntel" && activeView !== "Lawyers" && activeView !== "LawyersDelhi" && (
                <EnrichedTable companies={enrichedCompanies} type={activeView as "SaaS" | "AI"} />
              )}
              {activeTab === "Sourcing" && !isEnrichedMode && (
                <SourcingTab leads={filteredLeads} activeView={activeView as "Jobs" | "CEOs"} onOutreach={handleOutreach} />
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
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
