import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const {
    animation = 'fadeUp',
    delay = 0,
    duration = 0.8,
    stagger = 0.1,
    start = 'top 85%',
    children = false,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const targets = children ? el.children : el
      const props = { duration, delay, ease: 'power3.out' }

      const animations = {
        fadeUp: { y: 40, opacity: 0, ...props },
        fadeDown: { y: -40, opacity: 0, ...props },
        fadeLeft: { x: -40, opacity: 0, ...props },
        fadeRight: { x: 40, opacity: 0, ...props },
        scaleIn: { scale: 0.95, opacity: 0, ...props },
        stagger: { y: 30, opacity: 0, stagger, ...props },
      }

      gsap.from(targets, {
        ...animations[animation],
        scrollTrigger: {
          trigger: el,
          start,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [animation, delay, duration, stagger, start, children])

  return ref
}
