import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      const elements = containerRef.current.querySelectorAll('.hero-animate')
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      })

      // Pinned exit — hero stays while content fades and line grows
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=60%',
            pin: true,
            scrub: 0.8,
          },
        })

        // Fade out hero content
        tl.to(contentRef.current, {
          opacity: 0,
          scale: 0.95,
          y: -30,
          duration: 0.6,
          ease: 'power2.in',
        }, 0)

        // Grow the center line downward
        tl.fromTo(lineRef.current, {
          scaleY: 0,
          opacity: 0,
        }, {
          scaleY: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.2)

        // Fade out the scroll indicator
        tl.to('.scroll-indicator', {
          opacity: 0,
          y: 20,
          duration: 0.3,
        }, 0)
      })

      // Mobile — no pinning, just simple fade
      mm.add('(max-width: 767px)', () => {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden"
    >
      <div ref={contentRef} className="text-center max-w-4xl">
        <p className="hero-animate text-xs md:text-sm font-mono tracking-[0.2em] uppercase text-accent mb-6 md:mb-8">
          <span className="h-px w-8 bg-accent/30 inline-block align-middle mr-3" />
          Computational Biology
          <span className="h-px w-8 bg-accent/30 inline-block align-middle ml-3" />
        </p>

        <h1 className="hero-animate text-5xl md:text-7xl lg:text-8xl font-serif text-text-primary mb-8 tracking-tight leading-tight">
          Ralph Brown
          <span className="block font-serif text-2xl md:text-3xl text-accent italic mt-2">
            III
          </span>
        </h1>

        <div className="hero-animate w-24 h-1 bg-accent mx-auto mb-8 rounded-full" />

        <p className="hero-animate text-xl md:text-2xl text-text-secondary font-sans leading-relaxed max-w-2xl mx-auto">
          Exploring the intersection of neuroscience, machine learning, and human potential.
        </p>

        <p className="hero-animate text-base text-text-tertiary font-serif italic mt-4">
          Columbia University &middot; New York, NY
        </p>
      </div>

      {/* Growing center line — bridges hero to timeline */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-accent/0 via-accent/40 to-accent/60 origin-top hidden md:block"
        style={{ height: '30vh', opacity: 0, transform: 'scaleY(0)' }}
      />

      <div className="scroll-indicator hero-animate absolute bottom-8 flex flex-col items-center gap-2 text-text-tertiary">
        <span className="text-xs font-mono tracking-widest uppercase">Scroll to Explore</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  )
}
