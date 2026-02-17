import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const VIEWBOX_WIDTH = 1000
const CENTER_X = VIEWBOX_WIDTH / 2
const AMPLITUDE = 300

function generateFlowingPath(height, segments = 6) {
  if (height <= 0) return ''

  const segmentHeight = height / segments
  let d = `M ${CENTER_X},0`

  for (let i = 0; i < segments; i++) {
    const startY = i * segmentHeight
    const endY = (i + 1) * segmentHeight
    const direction = i % 2 === 0 ? 1 : -1

    // Vary amplitude slightly per segment for organic feel
    const amp = AMPLITUDE + (i % 3 === 0 ? 40 : i % 3 === 1 ? -20 : 0)

    const cp1x = CENTER_X + amp * direction
    const cp1y = startY + segmentHeight * 0.25
    const cp2x = CENTER_X + amp * direction
    const cp2y = startY + segmentHeight * 0.75

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${CENTER_X},${endY}`
  }

  return d
}

function getNodePositions(height, segments = 6) {
  const segmentHeight = height / segments
  const positions = []

  for (let i = 0; i < segments; i++) {
    const midY = (i + 0.5) * segmentHeight
    const direction = i % 2 === 0 ? 1 : -1
    const amp = AMPLITUDE + (i % 3 === 0 ? 40 : i % 3 === 1 ? -20 : 0)
    positions.push({
      x: CENTER_X + amp * direction * 0.75,
      y: midY,
    })
  }

  return positions
}

export default function TimelinePath({ containerRef }) {
  const pathRef = useRef(null)
  const svgRef = useRef(null)
  const circleRefs = useRef([])
  const [containerHeight, setContainerHeight] = useState(0)

  const segments = 8

  const updateHeight = useCallback(() => {
    const container = containerRef?.current
    if (container) {
      setContainerHeight(container.scrollHeight)
    }
  }, [containerRef])

  useEffect(() => {
    const container = containerRef?.current
    if (!container) return

    updateHeight()

    const observer = new ResizeObserver(() => updateHeight())
    observer.observe(container)
    return () => observer.disconnect()
  }, [containerRef, updateHeight])

  useEffect(() => {
    const path = pathRef.current
    const container = containerRef?.current
    if (!path || !container || containerHeight <= 0) return

    const ctx = gsap.context(() => {
      const length = path.getTotalLength()

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      // Main path draw animation
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
      })

      // Expanding circles at node positions
      circleRefs.current.forEach((circle) => {
        if (!circle) return

        gsap.fromTo(circle,
          { attr: { r: 3 }, opacity: 0 },
          {
            attr: { r: 20 },
            opacity: 0.15,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: circle,
              start: 'top 75%',
              end: 'top 25%',
              scrub: true,
            },
          }
        )
      })

      // Timeline nodes (from ProjectSection)
      const nodes = container.querySelectorAll('.timeline-node')
      nodes.forEach((node) => {
        gsap.from(node, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
          },
        })
      })
    }, container)

    return () => ctx.revert()
  }, [containerRef, containerHeight])

  if (containerHeight <= 0) return null

  const pathData = generateFlowingPath(containerHeight, segments)
  const nodePositions = getNodePositions(containerHeight, segments)

  return (
    <svg
      ref={svgRef}
      className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-0 hidden md:block"
      style={{ height: containerHeight, width: '100vw', maxWidth: '100%' }}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${containerHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradient mask for the drawing edge */}
        <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.4" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ghost/background path — always visible, very faint */}
      <path
        d={pathData}
        stroke="var(--color-accent)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.06"
      />

      {/* Main animated path with glow */}
      <path
        ref={pathRef}
        d={pathData}
        stroke="url(#pathGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        filter="url(#pathGlow)"
      />

      {/* Expanding ripple circles at curve peaks */}
      {nodePositions.map((pos, i) => (
        <g key={i}>
          {/* Outer expanding ring */}
          <circle
            ref={(el) => { circleRefs.current[i] = el }}
            cx={pos.x}
            cy={pos.y}
            r="3"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1"
            opacity="0"
          />
          {/* Inner static dot */}
          <circle
            cx={pos.x}
            cy={pos.y}
            r="3"
            fill="var(--color-accent)"
            opacity="0.2"
            className="timeline-node"
          />
        </g>
      ))}
    </svg>
  )
}
