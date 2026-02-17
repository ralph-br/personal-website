export default function TimelineNode({ active = false }) {
  return (
    <div
      className={`timeline-node w-4 h-4 rounded-full border-2 shadow-lg transition-colors duration-500 ${
        active
          ? 'bg-accent border-accent shadow-accent-glow'
          : 'bg-bg-primary border-accent/50'
      }`}
    />
  )
}
