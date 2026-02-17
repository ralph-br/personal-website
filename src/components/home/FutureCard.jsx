import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FutureCard() {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-20 px-6">
      <div
        ref={cardRef}
        className="future-card max-w-5xl mx-auto bg-accent text-white rounded-3xl p-12 md:p-20 relative overflow-hidden shadow-2xl"
      >
        {/* Decorative elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] border border-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] border border-white/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-[30%] right-[20%] w-[200px] h-[200px] border border-white/5 rounded-full" />

        <div className="relative z-10">
          <p className="text-xs md:text-sm font-mono tracking-[0.2em] uppercase text-white/60 mb-6 md:mb-8">
            What Comes Next
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
            The future is at the intersection of code and cognition.
          </h2>
          <p className="text-lg md:text-xl font-sans leading-relaxed text-white/80 max-w-2xl mb-10">
            From brain-computer interfaces to computational genomics, I&apos;m driven to build
            tools that decode the complexity of biological systems. Let&apos;s connect.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-accent rounded-full font-medium tracking-wide hover:bg-white/90 transition-colors group"
          >
            Get In Touch
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
