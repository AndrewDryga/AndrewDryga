export interface TechItem {
  language: string;
  files: number;
  code: number;
}

export const techStack: TechItem[] = [
  { language: "Elixir/Phoenix/LiveView", files: 890, code: 1050234 },
  { language: "Terraform/GCP/AWS", files: 177, code: 371823 },
  { language: "JavaScript", files: 289, code: 287654 },
  { language: "HTML/CSS/Tailwind", files: 412, code: 234567 },
  { language: "PHP", files: 156, code: 98765 },
  { language: "Kubernetes/Helm", files: 128, code: 57891 },
  { language: "PostgreSQL", files: 94, code: 44876 },
  { language: "Spreadsheets", files: 148, code: 37654 },
  { language: "BI dashboards", files: 83, code: 27891 },
];
