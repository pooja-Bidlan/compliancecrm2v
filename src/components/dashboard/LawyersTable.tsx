import { useState, useMemo, useCallback } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Download, Search, Linkedin, Globe, Mail, Phone, Building2, ChevronLeft, ChevronRight, MapPin, Scale, Briefcase } from "lucide-react";
import type { LawyerProspect } from "@/lib/lawyers-data";
import { LAWYER_COLUMNS } from "@/lib/lawyers-data";
import { downloadCSV } from "@/lib/csv-utils";

interface LawyersTableProps {
  companies: LawyerProspect[];
  variant: "pan-india" | "delhi-ncr";
}

const PAGE_SIZE = 50;

function convertToCSV(data: LawyerProspect[]): string {
  if (!data.length) return "";
  const headers = LAWYER_COLUMNS.map((c) => c.label);
  const rows = data.map((row) =>
    LAWYER_COLUMNS.map((c) => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  return `${headers.join(",")}\n${rows.join("\n")}`;
}

const techColors: Record<string, string> = {
  "None": "bg-destructive/10 text-destructive",
  "Basic (Email/Phone)": "bg-muted text-muted-foreground",
  "Moderate (Case Mgmt Software)": "bg-secondary text-secondary-foreground",
  "Advanced (Full Digital)": "bg-primary/10 text-primary",
  "Early Adopter": "bg-accent text-accent-foreground",
};

export function LawyersTable({ companies, variant }: LawyersTableProps) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebouncedValue(search, 200);

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return companies;
    const q = debouncedSearch.toLowerCase();
    return companies.filter(
      (c) =>
        c.lawyerName.toLowerCase().includes(q) ||
        c.firmName.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.practiceArea.toLowerCase().includes(q) ||
        c.specialization.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [companies, debouncedSearch]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = useMemo(
    () => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [filtered, page]
  );

  if (page > 0 && page >= totalPages) {
    setPage(0);
  }

  const handleExport = useCallback(() => {
    const csv = convertToCSV(filtered);
    const label = variant === "delhi-ncr" ? "Lawyers_DelhiNCR" : "Lawyers_PanIndia";
    downloadCSV(csv, `${label}_${filtered.length}.csv`);
  }, [filtered, variant]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold">
            {filtered.length.toLocaleString()} lawyers/firms
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            {LAWYER_COLUMNS.length} columns
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            {variant === "delhi-ncr" ? "Delhi NCR Only" : "Pan-India (excl. Delhi NCR)"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lawyer, firm, city, practice..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="pl-9 h-9 rounded-lg bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-all"
            />
          </div>
          <Button onClick={handleExport} variant="outline" size="sm" className="gap-2 rounded-lg">
            <Download className="h-4 w-4" />
            Export ({filtered.length.toLocaleString()})
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-8"></TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Lawyer / Advocate</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Firm</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">City</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Practice Area</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Experience</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Tech Adoption</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">LegalTech Need</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map((c) => (
                <>
                  <TableRow
                    key={c.id}
                    className="hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => toggleExpand(c.id)}
                  >
                    <TableCell className="w-8 px-2">
                      {expandedId === c.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground">{c.lawyerName}</p>
                        <p className="text-xs text-muted-foreground">{c.designation}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{c.firmName}</p>
                        <p className="text-xs text-muted-foreground">{c.firmType} · {c.firmSize}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{c.city}</p>
                          <p className="text-xs text-muted-foreground">{c.state}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-medium">{c.practiceArea}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{c.specialization}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{c.experienceYears} yrs</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${techColors[c.techAdoption] || "bg-muted text-muted-foreground"}`}>
                        {c.techAdoption}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{c.legalTechNeed}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a href={c.linkedinProfile} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <a href={c.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors">
                          <Globe className="h-4 w-4" />
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>

                  {expandedId === c.id && (
                    <TableRow key={`${c.id}-detail`} className="bg-muted/10">
                      <TableCell colSpan={9} className="p-0">
                        <div className="p-5 animate-fade-in">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                            <DetailItem icon={<Scale className="h-3.5 w-3.5" />} label="Bar Council ID" value={c.barCouncilId} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Court Practice" value={c.courtPractice} />
                            <DetailItem icon={<Briefcase className="h-3.5 w-3.5" />} label="Notable Clients" value={c.notableClients} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Caseload" value={c.caseloadEstimate} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Annual Revenue" value={c.annualRevenue} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Languages" value={c.languagesSpoken} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Year Established" value={String(c.yearEstablished)} />
                            <DetailItem icon={<MapPin className="h-3.5 w-3.5" />} label="Region" value={c.region} />
                          </div>

                          <div className="mt-4 pt-4 border-t border-border/40">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Contact Details</p>
                            <div className="flex items-center gap-4 flex-wrap">
                              <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-3.5 w-3.5" /> {c.email}
                              </a>
                              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Phone className="h-3.5 w-3.5" /> {c.phone}
                              </span>
                              <a href={c.linkedinProfile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                              </a>
                              <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                                <Globe className="h-3.5 w-3.5" /> Website
                              </a>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3">{c.description}</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>

        {filtered.length === 0 && (
          <div className="p-16 text-center">
            <p className="text-muted-foreground font-medium">No lawyers/firms found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search query.</p>
          </div>
        )}
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

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">{icon} {label}</p>
      <p className="font-medium text-foreground text-sm">{value}</p>
    </div>
  );
}
