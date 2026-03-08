import { useState, useMemo, useCallback } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Download, Search, Linkedin, Globe, Mail, Building2, Users, ChevronLeft, ChevronRight, Flag, Newspaper, UserCheck } from "lucide-react";
import type { MarketIntelProspect } from "@/lib/market-intel-data";
import { MARKET_INTEL_COLUMNS } from "@/lib/market-intel-data";
import { downloadCSV } from "@/lib/csv-utils";

interface MarketIntelTableProps {
  companies: MarketIntelProspect[];
}

const PAGE_SIZE = 50;

function convertToCSV(data: MarketIntelProspect[]): string {
  if (!data.length) return "";
  const headers = MARKET_INTEL_COLUMNS.map((c) => c.label);
  const rows = data.map((row) =>
    MARKET_INTEL_COLUMNS.map((c) => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  return `${headers.join(",")}\n${rows.join("\n")}`;
}

const scoreColors: Record<string, string> = {
  "🔥 Hot": "bg-destructive/10 text-destructive",
  "⭐ High": "bg-primary/10 text-primary",
  "📊 Medium": "bg-accent text-accent-foreground",
  "🔄 Warm": "bg-secondary text-secondary-foreground",
  "📌 Monitor": "bg-muted text-muted-foreground",
};

export function MarketIntelTable({ companies }: MarketIntelTableProps) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebouncedValue(search, 200);

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return companies;
    const q = debouncedSearch.toLowerCase();
    return companies.filter(
      (c) =>
        c.companyName.toLowerCase().includes(q) ||
        c.personName.toLowerCase().includes(q) ||
        c.companyCountry.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.newsType.toLowerCase().includes(q) ||
        c.personTitle.toLowerCase().includes(q)
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
    downloadCSV(csv, `Market_Intelligence_${filtered.length}.csv`);
  }, [filtered]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold">
            {filtered.length.toLocaleString()} prospects
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            {MARKET_INTEL_COLUMNS.length} columns
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            Latest → Oldest
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search person, company, news type..."
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
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Company</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Country</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">News Type</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Person</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">New Role</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Date</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Score</TableHead>
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
                        <p className="font-semibold text-foreground">{c.companyName}</p>
                        <p className="text-xs text-muted-foreground">{c.industry} · {c.subSector}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Flag className="h-3.5 w-3.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{c.companyCountry}</p>
                          <p className="text-xs text-muted-foreground">{c.region}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-medium">{c.newsType}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{c.personName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">{c.previousRole}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{c.personTitle}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{c.newsDate}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${scoreColors[c.prospectScore] || "bg-muted text-muted-foreground"}`}>
                        {c.prospectScore}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a href={c.companyLinkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <a href={c.companyWebsite} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors">
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
                            <DetailItem icon={<Newspaper className="h-3.5 w-3.5" />} label="News Headline" value={c.newsHeadline} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="News Source" value={c.newsSource} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Headquarters" value={c.headquarters} />
                            <DetailItem icon={<Users className="h-3.5 w-3.5" />} label="Employees" value={c.employeeCount.toLocaleString()} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Revenue Range" value={c.revenueRange} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Domain" value={c.companyDomain} />
                            <DetailItem icon={<UserCheck className="h-3.5 w-3.5" />} label="Compliance Opportunity" value={c.complianceOpportunity} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Regulatory Implication" value={c.regulatoryImplication} />
                            <div className="col-span-2 md:col-span-3 lg:col-span-4">
                              <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Description" value={c.description} />
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-border/40">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Person Details</p>
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{c.personName} — {c.personTitle}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Previously: {c.previousRole}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <a href={`mailto:${c.personEmail}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <Mail className="h-3 w-3" /> {c.personEmail}
                                  </a>
                                  <a href={c.personLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <Linkedin className="h-3 w-3" /> LinkedIn
                                  </a>
                                </div>
                              </div>
                            </div>
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
            <p className="text-muted-foreground font-medium">No prospects found</p>
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
