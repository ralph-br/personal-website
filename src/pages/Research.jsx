import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SkillTag from '../components/ui/SkillTag'
import { ExternalLink } from 'lucide-react'

const experiences = [
  {
    title: 'Undergraduate Research Assistant',
    org: 'Shohamy Lab, Columbia University',
    location: 'New York, NY',
    date: 'Sept 2025 — Present',
    status: 'Current',
    description: [
      'Analyze high-dimensional behavioral and fMRI data from memory tasks using Python-based statistical workflows to identify neural correlates of encoding and decision-making.',
      'Develop preprocessing pipelines for neuroimaging datasets to improve data throughput and ensure high-fidelity inputs for downstream ML and predictive models.',
      'Design a custom neural network in PyTorch to classify cognitive states from voxel activity, utilizing regularization techniques to prevent overfitting and improve generalization.',
      'Utilize Bash and Shell Scripting for high-performance computing (HPC) tasks, managing automated batch processing and large-scale file structures in a Linux environment.',
      'Present technical progress and data visualizations in weekly lab meetings, translating computational findings for a multidisciplinary team of PIs and PhDs.',
    ],
    skills: ['Python', 'PyTorch', 'fMRI', 'Bash', 'HPC', 'nilearn'],
  },
]

const activities = [
  {
    title: 'Claude Builder Club',
    org: 'Columbia University',
    date: 'Nov 2025 — Present',
    description:
      'Collaborate with student developers to prototype AI-powered applications using Claude/LLM frameworks. Participate in technical hackathons and workshops on integrating generative AI tools into research workflows.',
    skills: ['AI/ML', 'Prompt Engineering', 'Hackathons'],
  },
  {
    title: 'Varsity Cross Country & Track',
    org: 'Columbia University — NCAA Division I',
    date: 'Aug 2024 — Present',
    description:
      'Commit 30+ hours per week to rigorous NCAA Division I training and national competition within the Ivy League while maintaining a full-time STEM course load. Developed elite-level prioritization and time management under a demanding travel schedule.',
    skills: ['NCAA D1', 'Ivy League', 'Leadership'],
  },
]

export default function Research() {
  const pageRef = useRef(null)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from('.research-animate', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      })

      el.querySelectorAll('.scroll-reveal').forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="pt-24 pb-20 px-6 bg-bg-primary min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="research-animate text-5xl md:text-7xl font-serif text-text-primary mb-4 leading-tight">
          Research & Experience
        </h1>
        <p className="research-animate text-xl text-text-secondary font-sans leading-relaxed mb-4 max-w-2xl">
          My approach to research is grounded in craftsmanship and persistence — blending
          analytical rigor with creative problem-solving.
        </p>
        <div className="research-animate w-24 h-1 bg-accent rounded-full mb-16" />

        {/* Research Experience */}
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="scroll-reveal mb-16"
          >
            <div className="bg-bg-secondary rounded-2xl p-8 md:p-10 border border-border-subtle hover:border-accent/20 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 border-b border-dashed border-accent/20 pb-6">
                <div>
                  <h2 className="text-2xl font-serif text-text-primary">{exp.title}</h2>
                  <p className="text-text-secondary font-sans">{exp.org}</p>
                  <p className="text-sm text-text-tertiary">{exp.location}</p>
                </div>
                <div className="text-right flex flex-col items-start md:items-end gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent-muted rounded text-xs font-mono text-accent tracking-wider uppercase">
                    {exp.status}
                  </span>
                  <p className="text-sm text-text-tertiary font-mono">{exp.date}</p>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {exp.description.map((bullet, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-text-secondary font-sans leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Activities */}
        <h2 className="scroll-reveal text-3xl font-serif text-text-primary mb-8 border-l-4 border-accent pl-4">
          Beyond the Lab
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="scroll-reveal bg-bg-secondary rounded-2xl p-6 border border-border-subtle hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-glow/10"
            >
              <span className="inline-block px-3 py-1 bg-accent-muted rounded-full text-xs text-accent font-mono tracking-wider uppercase mb-3">
                {activity.date}
              </span>
              <h3 className="text-xl font-serif text-text-primary mb-1">{activity.title}</h3>
              <p className="text-sm text-text-tertiary mb-4">{activity.org}</p>
              <p className="text-text-secondary font-sans leading-relaxed mb-4">
                {activity.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {activity.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 border border-accent/30 rounded text-xs uppercase text-accent/80 font-mono tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
