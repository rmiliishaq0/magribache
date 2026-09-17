import { companySection } from "../types"

export default function CompanySection({
  id,
  Logo,
  title,
  description,
  isActive,
  setIsActive
}: companySection) {
  return (
    <button type="button" onClick={() => setIsActive(id)} className={`group flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors ${isActive ? "bg-primary text-primary-foreground shadow-[0_5px_10px_color-mix(in_srgb,var(--primary)_22%,transparent)]" : "text-secondary hover:bg-slate-50"}`}>
      <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500 group-hover:text-primary"}`}><Logo className="size-4" /></span>
      <span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className={`truncate text-xs font-semibold ${isActive ? "text-primary-foreground" : "text-slate-600"}`}>{title}</span></span><span className={`mt-0.5 block truncate text-[10px] ${isActive ? "text-primary-foreground/80" : "text-slate-400"}`}>{description}</span></span>
    </button>
  );
}
