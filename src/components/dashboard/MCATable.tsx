import { useState, useMemo, useCallback } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Download, Search, Linkedin, Globe, Mail, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import type { MCACompany } from "@/lib/mca-data";
import { MCA_COLUMNS } from "@/lib/mca-data";

interface MCATableProps { companies: MCACompany[]; }
const PAGE_SIZE = 50;

export function MCATable({ companies }: MCATableProps) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebouncedValue(search, 200);

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return companies;
    const q = debouncedSearch.toLowerCase();
    return companies.filter(c =>
      c.companyName.toLowerCase().includes(q) || c.foreignDirectorName.toLowerCase().includes(q) ||
      c.foreignDirectorNationality.toLowerCase().includes(q) || c.state.toLowerCase().includes(q) ||
      c.industry.toLowerCase().includes(q) || c.cin.toLowerCase().includes(q)
    );
  }, [companies, debouncedSearch]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = useMemo(() => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE), [filtered, page]);

  const handleExport = useCallback(() => {
    const headers = MCA_COLUMNS.map(c => c.label);
    const rows = filtered.map(row => MCA_COLUMNS.map(c => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(","));
    const blob = new Blob([`${headers.join(",")}\n${rows.join("\n")}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `MCA_Companies_${filtered.length}.csv`; a.click(); URL.revokeObjectURL(url);
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold">{filtered.length.toLocaleString()} companies</Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">{MCA_COLUMNS.length} columns</Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">Foreign Directors</Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search companies, directors, nationality..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9 h-9 rounded-lg bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-all" />
          </div>
          <Button onClick={handleExport} variant="outline" size="sm" className="gap-2 rounded-lg"><Download className="h-4 w-4" />Export ({filtered.length.toLocaleString()})</Button>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-8"></TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Company</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Type</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Foreign Director</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Nationality</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Capital</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Listing</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">State</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map(c => (
                <>
                  <TableRow key={c.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setExpandedId(p => p === c.id ? null : c.id)}>
                    <TableCell className="w-8 px-2">{expandedId === c.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}</TableCell>
                    <TableCell><p className="font-semibold text-foreground text-sm">{c.companyName}</p><p className="text-xs text-muted-foreground">{c.industry}</p></TableCell>
                    <TableCell><span className="text-xs bg-muted/50 rounded-full px-2.5 py-0.5">{c.companyType}</span></TableCell>
                    <TableCell><p className="text-sm font-medium">{c.foreignDirectorName}</p><p className="text-xs text-muted-foreground truncate max-w-[140px]">{c.foreignDirectorEmail}</p></TableCell>
                    <TableCell><span className="text-xs bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-medium">{c.foreignDirectorNationality}</span></TableCell>
                    <TableCell><p className="text-sm font-medium">{c.paidUpCapital}</p><p className="text-xs text-muted-foreground">Auth: {c.authorizedCapital}</p></TableCell>
                    <TableCell><p className="text-sm">{c.listingStatus}</p><p className="text-xs text-muted-foreground">{c.stockExchange}</p></TableCell>
                    <TableCell><p className="text-sm">{c.state}</p><p className="text-xs text-muted-foreground">{c.rocCode}</p></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a href={c.companyLinkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
                        <a href={c.companyWebsite} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors"><Globe className="h-4 w-4" /></a>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedId === c.id && (
                    <TableRow key={`${c.id}-d`} className="bg-muted/10">
                      <TableCell colSpan={9} className="p-0">
                        <div className="p-5 animate-fade-in">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                            <DI label="CIN" value={c.cin} /><DI label="Category" value={c.companyCategory} /><DI label="Sub-Category" value={c.companySubCategory} />
                            <DI label="Registration Date" value={c.registrationDate} /><DI label="Address" value={c.registeredAddress} /><DI label="Industry" value={c.industry} />
                          </div>
                          <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Foreign Director</p>
                              <p className="font-medium text-foreground">{c.foreignDirectorName} ({c.foreignDirectorNationality})</p>
                              <p className="text-xs text-muted-foreground">DIN: {c.foreignDirectorDIN}</p>
                              <div className="flex items-center gap-2">
                                <a href={`mailto:${c.foreignDirectorEmail}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><Mail className="h-3 w-3" /> {c.foreignDirectorEmail}</a>
                                <a href={c.foreignDirectorLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><Linkedin className="h-3 w-3" /> LinkedIn</a>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Indian Director</p>
                              <p className="font-medium text-foreground">{c.indianDirectorName}</p>
                              <p className="text-xs text-muted-foreground">DIN: {c.indianDirectorDIN}</p>
                              <a href={`mailto:${c.indianDirectorEmail}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><Mail className="h-3 w-3" /> {c.indianDirectorEmail}</a>
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
        {filtered.length === 0 && <div className="p-16 text-center"><p className="text-muted-foreground font-medium">No companies found</p></div>}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">Showing {(page * PAGE_SIZE + 1).toLocaleString()}–{Math.min((page + 1) * PAGE_SIZE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="rounded-lg gap-1"><ChevronLeft className="h-4 w-4" /> Prev</Button>
            <span className="text-sm font-medium text-muted-foreground px-2">{page + 1} / {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="rounded-lg gap-1">Next <ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

function DI({ label, value }: { label: string; value: string }) {
  return <div className="space-y-1"><p className="text-xs text-muted-foreground flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> {label}</p><p className="font-medium text-foreground text-sm">{value}</p></div>;
}
