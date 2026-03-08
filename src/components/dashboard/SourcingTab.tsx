import { useState, useMemo } from "react";
import { MapPin, Send, Globe, Linkedin, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { Lead } from "@/lib/mock-data";

interface SourcingTabProps {
  leads: Lead[];
  activeView: string;
  onOutreach: (lead: Lead) => void;
}

const PAGE_SIZE = 60;
const ALL = "__all__";

export function SourcingTab({ leads, activeView, onOutreach }: SourcingTabProps) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState(ALL);
  const [categoryFilter, setCategoryFilter] = useState(ALL);
  const debouncedSearch = useDebouncedValue(search, 250);

  // Derive unique locations & categories from full dataset
  const locations = useMemo(() => [...new Set(leads.map((l) => l.location))].sort(), [leads]);
  const categories = useMemo(() => [...new Set(leads.map((l) => l.category))].sort(), [leads]);

  const filtered = useMemo(() => {
    let result = leads;
    if (locationFilter !== ALL) {
      result = result.filter((l) => l.location === locationFilter);
    }
    if (categoryFilter !== ALL) {
      result = result.filter((l) => l.category === categoryFilter);
    }
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (l) =>
          l.entity.toLowerCase().includes(q) ||
          l.contact.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [leads, debouncedSearch, locationFilter, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = useMemo(
    () => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [filtered, page]
  );

  // Reset page when filtered results change
  const prevLen = useMemo(() => filtered.length, [filtered]);
  if (page > 0 && page >= Math.ceil(prevLen / PAGE_SIZE)) {
    setPage(0);
  }

  const hasActiveFilters = locationFilter !== ALL || categoryFilter !== ALL || search !== "";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeView === "Jobs" ? "jobs" : "CEOs"}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-lg"
          />
        </div>

        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-[160px] rounded-lg text-xs h-10">
            <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground shrink-0" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[220px] rounded-lg text-xs h-10">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setSearch(""); setLocationFilter(ALL); setCategoryFilter(ALL); }}
            className="text-xs gap-1 text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </Button>
        )}

        <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold ml-auto">
          {filtered.length.toLocaleString()} {activeView === "Jobs" ? "jobs" : "CEOs"}
        </Badge>
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
            Showing {(page * PAGE_SIZE + 1).toLocaleString()}–{Math.min((page + 1) * PAGE_SIZE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}
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