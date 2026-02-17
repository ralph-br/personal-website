export default function SkillTag({ children }) {
  return (
    <span className="px-3 py-1 bg-accent-muted text-accent text-sm font-mono rounded-full border border-accent/20 hover:border-accent/40 transition-colors">
      {children}
    </span>
  )
}
