export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-12">
      <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-accent rounded-full mt-6" />
    </div>
  )
}
