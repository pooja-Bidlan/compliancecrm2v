import { useState, useMemo, useCallback } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Download, Search, Linkedin, Globe, Mail, Briefcase, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import type { ComplianceHeadRecord } from "@/lib/compliance-head-data";
import { COMPLIANCE_HEAD_COLUMNS } from "@/lib/compliance-head-data";

interface Props { records: ComplianceHeadRecord[]; }
const PAGE_SIZE = 50;

export function ComplianceHeadTable({ records }: Props) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebouncedValue(search, 200);

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return records;
    const q = debouncedSearch.toLowerCase();
    return records.filter(r =>
      r.personName.toLowerCase().includes(q) || r.companyName.toLowerCase().includes(q) ||
      r.industry.toLowerCase().includes(q) || r.designation.toLowerCase().includes(q) ||
      r.headquarters.toLowerCase().includes(q)
    );
  }, [records, debouncedSearch]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = useMemo(() => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE), [filtered, page]);

  const handleExport = useCallback(() => {
    if (!filtered.length) return;
    const headers = COMPLIANCE_HEAD_COLUMNS.map(c => c.label);
    const rows = filtered.map(row => COMPLIANCE_HEAD_COLUMNS.map(c => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(","));
    const csv = `${headers.join(",")}\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `Compliance_Heads_${filtered.length}.csv`; a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold">{filtered.length.toLocaleString()} records</Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">{COMPLIANCE_HEAD_COLUMNS.length} columns</Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">500+ Employees</Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search names, companies..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} className="pl-9 h-9 rounded-lg bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-all" />
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
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Name</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Designation</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Company</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Industry</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Employees</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">HQ</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Email</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map(r => (
                <>
                  <TableRow key={r.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setExpandedId(prev => prev === r.id ? null : r.id)}>
                    <TableCell className="w-8 px-2">{expandedId === r.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}</TableCell>
                    <TableCell><p className="font-semibold text-foreground text-sm">{r.personName}</p><p className="text-xs text-muted-foreground">{r.yearsInRole} experience</p></TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{r.designation}</Badge></TableCell>
                    <TableCell><p className="text-sm font-medium">{r.companyName}</p><p className="text-xs text-muted-foreground">{r.companyType}</p></TableCell>
                    <TableCell><p className="text-sm">{r.industry}</p><p className="text-xs text-muted-foreground">{r.subSector}</p></TableCell>
                    <TableCell><span className="text-sm font-medium text-primary">{r.employeeCount}</span></TableCell>
                    <TableCell><p className="text-sm">{r.headquarters}</p><p className="text-xs text-muted-foreground">{r.region}</p></TableCell>
                    <TableCell><p className="text-xs text-muted-foreground truncate max-w-[160px]">{r.email}</p></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a href={r.linkedinPerson} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
                        <a href={r.companyWebsite} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors"><Globe className="h-4 w-4" /></a>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedId === r.id && (
                    <TableRow key={`${r.id}-detail`} className="bg-muted/10">
                      <TableCell colSpan={9} className="p-0">
                        <div className="p-5 animate-fade-in">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                            <DI label="Revenue" value={r.revenue} />
                            <DI label="Certifications" value={r.certifications} />
                            <DI label="Regulatory Focus" value={r.regulatoryFocus} />
                            <DI label="Team Size" value={r.complianceTeamSize} />
                            <DI label="Reporting To" value={r.reportingTo} />
                            <DI label="Board Member" value={r.boardMember} />
                            <DI label="Listing Status" value={r.listingStatus} />
                            <DI label="Compliance Budget" value={r.complianceBudget} />
                            <DI label="Previous Company" value={r.previousCompany} />
                            <DI label="Tech Stack" value={r.techStack} />
                          </div>
                          <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-4">
                            <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg px-3 py-1.5 hover:bg-primary/90 transition-colors"><Mail className="h-3.5 w-3.5" />Email</a>
                            <a href={r.linkedinPerson} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"><Linkedin className="h-3.5 w-3.5" />LinkedIn</a>
                            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Phone className="h-3.5 w-3.5" />{r.phone}</span>
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
        {filtered.length === 0 && <div className="p-16 text-center"><p className="text-muted-foreground font-medium">No records found</p></div>}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">Showing {(page * PAGE_SIZE + 1).toLocaleString()}–{Math.min((page + 1) * PAGE_SIZE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="rounded-lg gap-1"><ChevronLeft className="h-4 w-4" />Prev</Button>
            <span className="text-sm font-medium text-muted-foreground px-2">{page + 1} / {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="rounded-lg gap-1">Next<ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

function DI({ label, value }: { label: string; value: string }) {
  return <div className="space-y-1"><p className="text-xs text-muted-foreground flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{label}</p><p className="font-medium text-foreground text-sm">{value}</p></div>;
}
