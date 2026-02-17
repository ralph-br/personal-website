import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Mail, Phone, Github, ArrowUpRight } from 'lucide-react'

export default function Contact() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-animate', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="pt-24 pb-20 px-6 bg-bg-primary min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto w-full text-center">
        <p className="contact-animate text-xs md:text-sm font-mono tracking-[0.2em] uppercase text-accent mb-6">
          Get In Touch
        </p>

        <h1 className="contact-animate text-5xl md:text-7xl font-serif text-text-primary mb-6 leading-tight">
          Let&apos;s Connect
        </h1>

        <div className="contact-animate w-24 h-1 bg-accent mx-auto mb-8 rounded-full" />

        <p className="contact-animate text-xl text-text-secondary font-sans leading-relaxed mb-12 max-w-xl mx-auto">
          Have a project in mind or just want to say hello? I&apos;d love to hear from you.
        </p>

        <div className="contact-animate space-y-6 mb-12">
          <a
            href="mailto:ralph.brown@columbia.edu"
            className="flex items-center justify-center gap-3 text-lg md:text-xl font-mono text-text-primary hover:text-accent transition-colors group"
          >
            <Mail size={20} className="text-accent" />
            ralph.brown@columbia.edu
            <ArrowUpRight size={16} className="text-text-tertiary group-hover:text-accent transition-colors" />
          </a>

          <a
            href="tel:+12196704625"
            className="flex items-center justify-center gap-3 text-lg md:text-xl font-mono text-text-primary hover:text-accent transition-colors group"
          >
            <Phone size={20} className="text-accent" />
            (219) 670-4625
            <ArrowUpRight size={16} className="text-text-tertiary group-hover:text-accent transition-colors" />
          </a>
        </div>

        <div className="contact-animate flex justify-center">
          <a
            href="https://github.com/ralph-br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-bg-secondary border border-border-subtle rounded-full text-text-secondary hover:text-accent hover:border-accent/30 transition-all duration-300 group"
          >
            <Github size={20} />
            <span className="font-mono text-sm">github.com/ralph-br</span>
            <ArrowUpRight size={16} className="text-text-tertiary group-hover:text-accent transition-colors" />
          </a>
        </div>
      </div>
    </div>
  )
}
