import { Briefcase, Users, Rocket, Archive, Inbox, Download, UserCircle, LogOut } from "lucide-react";
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
import { useAuth } from "@/hooks/useAuth";

interface AppSidebarProps {
  activeView: "Jobs" | "CEOs";
  setActiveView: (v: "Jobs" | "CEOs") => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
  onExport: () => void;
}

export function AppSidebar({ activeView, setActiveView, activeTab, setActiveTab, onExport }: AppSidebarProps) {
  const { signOut } = useAuth();

  const navItems = [
    { id: "Sourcing", icon: Rocket, label: "Live Pipeline" },
    { id: "Archive", icon: Archive, label: "Master Archive" },
    { id: "Inbox", icon: Inbox, label: "Response Hub" },
    { id: "Profile", icon: UserCircle, label: "Profile & Settings" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary">
            <Briefcase className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-sidebar-foreground">Compliance HQ</p>
            <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest">Outreach Engine</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mode</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "Jobs"}
                  onClick={() => { setActiveView("Jobs"); setActiveTab("Sourcing"); }}
                  tooltip="Remote Jobs"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Remote Jobs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === "CEOs"}
                  onClick={() => { setActiveView("CEOs"); setActiveTab("Sourcing"); }}
                  tooltip="Funded CEOs"
                >
                  <Users className="h-4 w-4" />
                  <span>Funded CEOs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => setActiveTab(item.id)}
                    tooltip={item.label}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-2">
        <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs" onClick={onExport}>
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs text-destructive hover:text-destructive" onClick={signOut}>
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
