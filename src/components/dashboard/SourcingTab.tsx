import { MapPin, Send, Globe, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/lib/mock-data";

interface SourcingTabProps {
  leads: Lead[];
  activeView: "Jobs" | "CEOs";
  onOutreach: (lead: Lead) => void;
}

export function SourcingTab({ leads, activeView, onOutreach }: SourcingTabProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {leads.map((lead) => (
        <Card key={lead.id} className="group hover:shadow-lg transition-all border-border">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">{lead.entity}</h3>
                <p className="text-xs text-muted-foreground">
                  {lead.contact} · {lead.type === "Job" ? "Recruiter" : lead.category}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs font-bold shrink-0">
                {activeView === "Jobs" ? lead.salary : lead.funding}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {lead.location}
              </span>
              {activeView === "CEOs" && lead.model && (
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" /> {lead.model}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <a
                href={lead.linkedinContact}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Linkedin className="h-3.5 w-3.5" /> Contact
              </a>
              <a
                href={lead.linkedinCompany}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Linkedin className="h-3.5 w-3.5" /> Company
              </a>
            </div>
            <Button
              onClick={() => onOutreach(lead)}
              className="w-full"
              variant={activeView === "Jobs" ? "default" : "secondary"}
            >
              <Send className="h-4 w-4 mr-2" />
              {activeView === "Jobs" ? "Apply for Remote FCCO" : "Pitch Fractional Model"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
