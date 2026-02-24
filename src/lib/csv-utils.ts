export interface ExportRow {
  entity: string;
  contact: string;
  category: string;
  email: string;
  location: string;
  metadata?: string;
  model?: string;
  status: string;
  responseStatus: string;
}

export function convertToCSV(data: ExportRow[], type: "Job" | "CEO"): string {
  if (!data.length) return "";
  const headers =
    type === "Job"
      ? ["Company Name", "Recruiter Name", "Role Applied", "Email", "Salary/Range", "Location", "Status", "Response Status"]
      : ["Company Name", "CEO Name", "Funding Amount", "Round", "Model (CCO/FCO)", "Email", "Status", "Response Status"];

  const rows = data.map((row) => {
    if (type === "Job") {
      return [row.entity, row.contact, row.category, row.email, row.metadata || "", row.location, row.status, row.responseStatus]
        .map((v) => `"${v}"`)
        .join(",");
    }
    return [row.entity, row.contact, row.metadata || "", row.category, row.model || "", row.email, row.status, row.responseStatus]
      .map((v) => `"${v}"`)
      .join(",");
  });
  return `${headers.join(",")}\n${rows.join("\n")}`;
}

export function downloadCSV(content: string, fileName: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
