import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <a
          href="https://github.com/ralph-br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-tertiary hover:text-accent transition-colors"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <p className="text-sm text-text-tertiary font-mono">
          Designed & built by Ralph Brown III &copy; 2026
        </p>
      </div>
    </footer>
  )
}
