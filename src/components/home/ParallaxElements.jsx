import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const shapes = [
  { type: 'circle', size: 300, x: '10%', y: '15%', speed: -60 },
  { type: 'circle', size: 200, x: '85%', y: '25%', speed: -40 },
  { type: 'ring', size: 400, x: '75%', y: '45%', speed: -80 },
  { type: 'circle', size: 150, x: '5%', y: '55%', speed: -30 },
  { type: 'ring', size: 250, x: '90%', y: '70%', speed: -50 },
  { type: 'circle', size: 350, x: '20%', y: '85%', speed: -70 },
]

export default function ParallaxElements({ containerRef }) {
  const elementsRef = useRef([])

  useEffect(() => {
    const container = containerRef?.current
    if (!container) return

    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el, i) => {
        if (!el) return

        gsap.to(el, {
          y: shapes[i].speed,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, container)

    return () => ctx.revert()
  }, [containerRef])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block" aria-hidden="true">
      {shapes.map((shape, i) => (
        <div
          key={i}
          ref={(el) => { elementsRef.current[i] = el }}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
        >
          {shape.type === 'circle' ? (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
                opacity: 0.03,
              }}
            />
          ) : (
            <div
              className="w-full h-full rounded-full border"
              style={{
                borderColor: 'var(--color-accent)',
                opacity: 0.04,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
