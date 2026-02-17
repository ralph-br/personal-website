import { useEffect } from 'react'
import { X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-primary/60 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full md:w-[90vw] max-w-5xl max-h-[90vh] bg-bg-secondary rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-[fadeIn_0.3s_ease-out]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-bg-tertiary/80 rounded-full hover:bg-accent hover:text-white text-text-secondary transition-all hover:rotate-90 duration-300"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="p-8 md:p-12 border-b border-border-subtle">
          <span className="inline-block px-3 py-1 bg-accent-muted rounded-full text-xs text-accent font-mono tracking-wider uppercase mb-4">
            {project.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary leading-tight">
            {project.title}
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <div className="prose prose-lg max-w-none font-sans leading-relaxed text-text-secondary
            [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:text-text-primary [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-serif [&_h3]:text-text-primary [&_h3]:mt-6 [&_h3]:mb-3
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
            [&_li]:text-text-secondary
            [&_strong]:text-text-primary [&_strong]:font-semibold
            [&_code]:text-accent [&_code]:bg-accent-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
            [&_p]:mb-4">
            <ReactMarkdown>{project.details}</ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-border-subtle">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-accent-muted border border-accent/20 rounded-full text-sm text-accent font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
