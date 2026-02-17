import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function createHeroEntrance(container) {
  const tl = gsap.timeline({ delay: 0.3 })
  const elements = container.querySelectorAll('.hero-animate')

  tl.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
  })

  return tl
}

export function createPathDrawAnimation(pathElement, triggerElement) {
  if (!pathElement) return null

  const length = pathElement.getTotalLength()

  gsap.set(pathElement, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  return gsap.to(pathElement, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.5,
    },
  })
}

export function createSectionReveal(sectionElement, direction = 'up') {
  const props = {
    up: { y: 60, opacity: 0 },
    left: { x: -60, opacity: 0 },
    right: { x: 60, opacity: 0 },
  }

  return gsap.from(sectionElement, {
    ...props[direction],
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: sectionElement,
      start: 'top 80%',
    },
  })
}
