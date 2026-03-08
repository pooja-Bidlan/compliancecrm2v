import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronUp, ExternalLink, Mail, DollarSign } from "lucide-react";
import { USA_COMPLIANCE_COLUMNS, type USAComplianceRecord } from "@/lib/usa-compliance-data";

interface USAComplianceTableProps {
  records: USAComplianceRecord[];
}

const PAGE_SIZE = 50;

export function USAComplianceTable({ records }: USAComplianceTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return records;
    const q = search.toLowerCase();
    return records.filter(
      (r) =>
        r.companyName.toLowerCase().includes(q) ||
        r.ccoName.toLowerCase().includes(q) ||
        r.ceoName.toLowerCase().includes(q) ||
        r.industry.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.ticker.toLowerCase().includes(q)
    );
  }, [records, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const primaryCols = USA_COMPLIANCE_COLUMNS.slice(0, 10);
  const detailCols = USA_COMPLIANCE_COLUMNS.slice(10);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company, CCO, CEO, ticker, industry, state..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 h-9 rounded-lg bg-muted/50 border-transparent focus:border-primary/30"
          />
        </div>
        <Badge variant="secondary" className="text-xs px-3 py-1 rounded-full">
          {filtered.length.toLocaleString()} records
        </Badge>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                {primaryCols.map((col) => (
                  <TableHead key={col.key} className="text-xs font-semibold whitespace-nowrap">{col.label}</TableHead>
                ))}
                <TableHead className="text-xs font-semibold">CCO Salary</TableHead>
                <TableHead className="text-xs font-semibold">CCO Email</TableHead>
                <TableHead className="text-xs font-semibold">CEO Email</TableHead>
                <TableHead className="text-xs font-semibold w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((record) => (
                <>
                  <TableRow key={record.id} className="hover:bg-muted/20 cursor-pointer" onClick={() => setExpandedRow(expandedRow === record.id ? null : record.id)}>
                    {primaryCols.map((col) => (
                      <TableCell key={col.key} className="text-xs whitespace-nowrap max-w-[200px] truncate">
                        {col.key === "id" ? record.id.replace("usa-", "") : record[col.key]}
                      </TableCell>
                    ))}
                    <TableCell className="text-xs whitespace-nowrap">
                      <Badge variant="outline" className="gap-1 text-xs font-semibold border-success/30 bg-success/5 text-success">
                        <DollarSign className="h-3 w-3" />
                        {record.ccoSalary}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      <a href={`mailto:${record.ccoEmail}`} className="text-primary hover:underline flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Mail className="h-3 w-3" /> {record.ccoEmail.length > 28 ? record.ccoEmail.slice(0, 28) + "…" : record.ccoEmail}
                      </a>
                    </TableCell>
                    <TableCell className="text-xs">
                      <a href={`mailto:${record.ceoEmail}`} className="text-primary hover:underline flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Mail className="h-3 w-3" /> {record.ceoEmail.length > 28 ? record.ceoEmail.slice(0, 28) + "…" : record.ceoEmail}
                      </a>
                    </TableCell>
                    <TableCell>
                      {expandedRow === record.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </TableCell>
                  </TableRow>
                  {expandedRow === record.id && (
                    <TableRow key={`${record.id}-detail`} className="bg-muted/10">
                      <TableCell colSpan={14} className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                          {detailCols.map((col) => (
                            <div key={col.key} className="space-y-0.5">
                              <span className="text-muted-foreground font-medium">{col.label}</span>
                              <p className="text-foreground font-medium">
                                {col.key === "ccoLinkedin" || col.key === "ceoLinkedin" || col.key === "companyLinkedin" || col.key === "companyWebsite" ? (
                                  <a href={record[col.key]} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                                    <ExternalLink className="h-3 w-3" /> View
                                  </a>
                                ) : col.key === "ccoEmail" || col.key === "ceoEmail" ? (
                                  <a href={`mailto:${record[col.key]}`} className="text-primary hover:underline">{record[col.key]}</a>
                                ) : (
                                  record[col.key]
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Showing {((page - 1) * PAGE_SIZE + 1).toLocaleString()}–{Math.min(page * PAGE_SIZE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)} className="text-xs h-8">Previous</Button>
          <span className="text-xs text-muted-foreground">Page {page} of {totalPages.toLocaleString()}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="text-xs h-8">Next</Button>
        </div>
      </div>
    </div>
  );
}
