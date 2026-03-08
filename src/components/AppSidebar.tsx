import { Briefcase, Users, Rocket, Archive, Inbox, Download, UserCircle } from "lucide-react";
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

interface AppSidebarProps {
  activeView: "Jobs" | "CEOs";
  setActiveView: (v: "Jobs" | "CEOs") => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  onExport: () => void;
}

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
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "Jobs"}
                  onClick={() => { setActiveView("Jobs"); setActiveTab("Sourcing"); }}
                  tooltip="Remote Jobs"
                  className="rounded-lg transition-all duration-200"
                >
                  <Briefcase className="h-4 w-4" />
                  <span className="font-medium">Remote Jobs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "CEOs"}
                  onClick={() => { setActiveView("CEOs"); setActiveTab("Sourcing"); }}
                  tooltip="Funded CEOs"
                  className="rounded-lg transition-all duration-200"
                >
                  <Users className="h-4 w-4" />
                  <span className="font-medium">Funded CEOs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
