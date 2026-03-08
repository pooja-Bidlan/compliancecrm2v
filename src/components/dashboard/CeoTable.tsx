import { useState, useMemo, useCallback } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Download, Search, Linkedin, Globe, Mail, Building2, Users, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import type { FundedCEO } from "@/lib/ceo-data";
import { CEO_COLUMNS } from "@/lib/ceo-data";
import { downloadCSV } from "@/lib/csv-utils";

interface CeoTableProps {
  companies: FundedCEO[];
}

const PAGE_SIZE = 50;

function convertCeoToCSV(data: FundedCEO[]): string {
  if (!data.length) return "";
  const headers = CEO_COLUMNS.map((c) => c.label);
  const rows = data.map((row) =>
    CEO_COLUMNS.map((c) => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  return `${headers.join(",")}\n${rows.join("\n")}`;
}

export function CeoTable({ companies }: CeoTableProps) {
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
        c.ceoName.toLowerCase().includes(q) ||
        c.companyCountry.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.subSector.toLowerCase().includes(q)
    );
  }, [companies, debouncedSearch]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = useMemo(
    () => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [filtered, page]
  );

  const handleExport = useCallback(() => {
    const csv = convertCeoToCSV(filtered);
    downloadCSV(csv, `Funded_CEOs_${filtered.length}.csv`);
  }, [filtered]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold">
            {filtered.length.toLocaleString()} CEOs
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            {CEO_COLUMNS.length} columns
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            Latest → Oldest
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search CEO, company, country..."
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
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Industry</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Employees</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Funding</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">CEO / Founder</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Compliance Model</TableHead>
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
                        <p className="text-xs text-muted-foreground">{c.subSector}</p>
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
                      <span className="text-sm bg-muted/50 rounded-full px-2.5 py-0.5">{c.industry}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{c.employeeCount.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-primary">{c.fundingTotal}</p>
                        <p className="text-xs text-muted-foreground">{c.latestRound}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{c.ceoName}</p>
                        <p className="text-xs text-muted-foreground">{c.ceoTitle}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs bg-primary/10 text-primary rounded-full px-2.5 py-0.5">{c.complianceModel}</span>
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
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Headquarters" value={c.headquarters} />
                            <DetailItem icon={<Flag className="h-3.5 w-3.5" />} label="Native Country" value={c.companyCountry} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Founded" value={String(c.foundedYear)} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Revenue" value={c.revenueRange} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Valuation" value={c.valuation} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Last Funding" value={c.lastFundingDate} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Tech Stack" value={c.techStack} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Domain" value={c.companyDomain} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Regulatory Trigger" value={c.regulatoryTrigger} />
                            <div className="col-span-2">
                              <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Key Investors" value={c.investors} />
                            </div>
                            <div className="col-span-2 md:col-span-3 lg:col-span-4">
                              <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Description" value={c.description} />
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-border/40">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">CEO / Founder</p>
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{c.ceoName} — {c.ceoTitle}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <a href={`mailto:${c.ceoEmail}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <Mail className="h-3 w-3" /> {c.ceoEmail}
                                  </a>
                                  <a href={c.ceoLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
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
            <p className="text-muted-foreground font-medium">No CEOs found</p>
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
