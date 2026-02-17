import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TimelineNode from '../ui/TimelineNode'

export default function ProjectSection({ project, index, onOpen }) {
  const sectionRef = useRef(null)
  const bgNumberRef = useRef(null)
  const isReversed = index % 2 !== 0

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const card = el.querySelector('.project-card')
      const textElements = el.querySelectorAll('.project-text-animate')
      const bgNumber = bgNumberRef.current

      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        // Background number parallax — moves slower than scroll
        if (bgNumber) {
          gsap.fromTo(bgNumber, {
            y: 100,
            opacity: 0,
          }, {
            y: -80,
            opacity: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        // Card reveal with clip-path
        gsap.fromTo(card, {
          clipPath: isReversed
            ? 'inset(0 0 0 100%)'
            : 'inset(0 100% 0 0)',
          opacity: 0.3,
        }, {
          clipPath: 'inset(0 0 0 0)',
          opacity: 1,
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
          },
        })

        // Staggered text reveals
        gsap.fromTo(textElements, {
          y: 40,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 0.5,
          },
        })

        // Subtle parallax — card and text move at different speeds
        gsap.to(card, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // Mobile — simpler animations
      mm.add('(max-width: 767px)', () => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        })

        gsap.from(textElements, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [isReversed])

  return (
    <section
      ref={sectionRef}
      className="project-section min-h-screen flex items-center justify-center relative py-20 px-6 overflow-hidden"
    >
      {/* Large background number */}
      <div
        ref={bgNumberRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none hidden md:flex"
        aria-hidden="true"
      >
        <span className="text-[20vw] font-serif font-bold text-accent opacity-0 leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Timeline node */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
        <TimelineNode />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
        {/* Project card (visual side) */}
        <div
          className={`project-card ${isReversed ? 'md:order-2' : 'md:order-1'}`}
        >
          <div
            onClick={() => onOpen(project)}
            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-bg-secondary border border-border-subtle group hover:border-accent/30 transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-glow/20"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-muted flex items-center justify-center">
                  <span className="text-accent font-mono text-lg font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-text-tertiary text-sm font-mono">Click to explore</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Project text */}
        <div
          className={`${
            isReversed ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'
          }`}
        >
          <span className="project-text-animate inline-block px-3 py-1 bg-accent-muted rounded-full text-xs text-accent font-mono tracking-wider uppercase mb-4">
            {project.subtitle}
          </span>
          <h3 className="project-text-animate text-3xl md:text-4xl font-serif text-text-primary mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="project-text-animate text-lg text-text-secondary font-sans leading-relaxed mb-6">
            {project.description}
          </p>
          <div className={`project-text-animate flex flex-wrap gap-2 ${isReversed ? 'md:justify-end' : ''}`}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-accent/40 rounded text-xs uppercase text-accent font-medium tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
