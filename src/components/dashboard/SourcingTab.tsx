import { useState, useMemo } from "react";
import { MapPin, Send, Globe, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/lib/mock-data";

interface SourcingTabProps {
  leads: Lead[];
  activeView: string;
  onOutreach: (lead: Lead) => void;
}

const PAGE_SIZE = 60;

export function SourcingTab({ leads, activeView, onOutreach }: SourcingTabProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(leads.length / PAGE_SIZE);
  const pageData = useMemo(
    () => leads.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [leads, page]
  );

  // Reset page when leads change (e.g. search filter)
  const prevLen = useMemo(() => leads.length, [leads]);
  if (page > 0 && page >= Math.ceil(prevLen / PAGE_SIZE)) {
    setPage(0);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold">
          {leads.length.toLocaleString()} {activeView === "Jobs" ? "jobs" : "CEOs"}
        </Badge>
        {totalPages > 1 && (
          <p className="text-xs text-muted-foreground">
            Page {page + 1} of {totalPages}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageData.map((lead) => (
          <Card
            key={lead.id}
            className="group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-border/60 rounded-xl overflow-hidden"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">{lead.entity}</h3>
                  <p className="text-xs text-muted-foreground">
                    {lead.contact} · {lead.type === "Job" ? "Recruiter" : lead.category}
                  </p>
                </div>
                <Badge className="text-xs font-semibold shrink-0 rounded-full px-2.5 bg-primary/10 text-primary border-0 hover:bg-primary/10">
                  {activeView === "Jobs" ? lead.salary : lead.funding}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 bg-muted/80 rounded-full px-2.5 py-1">
                  <MapPin className="h-3 w-3" /> {lead.location}
                </span>
                {activeView === "CEOs" && lead.model && (
                  <span className="flex items-center gap-1 bg-muted/80 rounded-full px-2.5 py-1">
                    <Globe className="h-3 w-3" /> {lead.model}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <a
                  href={lead.linkedinContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  <Linkedin className="h-3.5 w-3.5" /> Contact
                </a>
                <a
                  href={lead.linkedinCompany}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  <Linkedin className="h-3.5 w-3.5" /> Company
                </a>
              </div>
              <Button
                onClick={() => onOutreach(lead)}
                className="w-full rounded-lg font-semibold shadow-sm group-hover:shadow-md transition-shadow"
                variant={activeView === "Jobs" ? "default" : "secondary"}
              >
                <Send className="h-4 w-4 mr-2" />
                {activeView === "Jobs" ? "Apply for Remote FCCO" : "Pitch Fractional Model"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Showing {(page * PAGE_SIZE + 1).toLocaleString()}–{Math.min((page + 1) * PAGE_SIZE, leads.length).toLocaleString()} of {leads.length.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-lg gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="text-sm font-medium text-muted-foreground px-2">
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="rounded-lg gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
