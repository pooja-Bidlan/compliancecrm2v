import { Briefcase, Users, Rocket, Archive, Inbox, Download, UserCircle, Building2, Bot, Landmark, GraduationCap, Newspaper, Scale, FileText, BookOpen, Calculator, ShieldCheck, ScrollText, BadgeDollarSign, Flag } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type ViewMode = "Jobs" | "CEOs" | "SaaS" | "AI" | "BFSI" | "Coaching" | "MarketIntel" | "Lawyers" | "LawyersDelhi" | "MCA" | "ICSI" | "ICAI" | "ComplianceHead" | "CSJob" | "CFO" | "USACompliance";

interface AppSidebarProps {
  activeView: ViewMode;
  setActiveView: (v: ViewMode) => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  onExport: () => void;
}

const modeItems: { id: ViewMode; icon: typeof Briefcase; label: string; count?: string }[] = [
  { id: "Jobs", icon: Briefcase, label: "Remote Jobs", count: "5K" },
  { id: "CEOs", icon: Users, label: "Funded CEOs", count: "20K" },
  { id: "SaaS", icon: Building2, label: "SaaS Companies", count: "10K" },
  { id: "AI", icon: Bot, label: "AI Companies", count: "5K" },
  { id: "BFSI", icon: Landmark, label: "BFSI India", count: "80K" },
  { id: "Coaching", icon: GraduationCap, label: "Coaching India", count: "40K" },
  { id: "MarketIntel", icon: Newspaper, label: "Market Intelligence", count: "5K" },
  { id: "Lawyers", icon: Scale, label: "Lawyers Pan-India", count: "100K" },
  { id: "LawyersDelhi", icon: Scale, label: "Lawyers Delhi NCR", count: "80K" },
  { id: "MCA", icon: FileText, label: "MCA Listed (Foreign Dir.)", count: "40K" },
  { id: "ICSI", icon: BookOpen, label: "ICSI Practice", count: "20K" },
  { id: "ICAI", icon: Calculator, label: "ICAI Practice", count: "20K" },
  { id: "ComplianceHead", icon: ShieldCheck, label: "Compliance Heads", count: "50K" },
  { id: "CSJob", icon: ScrollText, label: "CS in Service", count: "50K" },
  { id: "CFO", icon: BadgeDollarSign, label: "CFOs / Chief Finance", count: "50K" },
];

export function AppSidebar({ activeView, setActiveView, activeTab, setActiveTab, onExport }: AppSidebarProps) {
  const navItems = [
    { id: "Sourcing", icon: Rocket, label: "Live Pipeline" },
    { id: "Archive", icon: Archive, label: "Master Archive" },
    { id: "Inbox", icon: Inbox, label: "Response Hub" },
    { id: "Profile", icon: UserCircle, label: "Profile & Settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-sidebar-foreground tracking-tight">Compliance HQ</p>
            <p className="text-[10px] text-sidebar-foreground/40 uppercase tracking-[0.2em] font-medium">Outreach Engine</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator className="opacity-20" />

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.15em] text-sidebar-foreground/40 font-semibold px-3">Mode</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modeItems.map((mode) => (
                <SidebarMenuItem key={mode.id}>
                  <SidebarMenuButton
                    isActive={activeView === mode.id}
                    onClick={() => { setActiveView(mode.id); setActiveTab("Sourcing"); }}
                    tooltip={mode.label}
                    className="rounded-lg transition-all duration-200"
                  >
                    <mode.icon className="h-4 w-4" />
                    <span className="font-medium flex-1">{mode.label}</span>
                    {mode.count && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 rounded-full ml-auto font-semibold">
                        {mode.count}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="opacity-20" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.15em] text-sidebar-foreground/40 font-semibold px-3">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                    tooltip={item.label}
                    className="rounded-lg transition-all duration-200"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs border-sidebar-border text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg" onClick={onExport}>
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
