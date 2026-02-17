import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '../components/ui/SectionHeading'
import SkillTag from '../components/ui/SkillTag'
import { skillCategories } from '../data/skills'
import { education } from '../data/education'

const interests = [
  'Brain-Computer Interfaces',
  'Neural Engineering',
  'ML for Drug Discovery',
  'Computational Genomics',
  'Genetic Engineering',
  'Climate Modeling',
  'Conservation Biology',
]

export default function About() {
  const pageRef = useRef(null)

  useEffect(() => {
    const el = pageRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from('.about-animate', {
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
        {/* Bio Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 mb-20">
          <div>
            <h1 className="about-animate text-5xl md:text-7xl font-serif text-text-primary mb-8 leading-tight">
              About Me
            </h1>
            <div className="about-animate w-24 h-1 bg-accent rounded-full mb-8" />

            <div className="space-y-6 text-lg text-text-secondary font-sans leading-relaxed">
              <p className="about-animate">
                I&apos;m Ralph — a computational biology student at Columbia University
                with a deep curiosity for how the brain encodes, stores, and retrieves information.
                My work lives at the intersection of neuroscience and machine learning, where I
                build tools that help us understand the neural mechanisms behind memory and
                decision-making.
              </p>
              <p className="about-animate">
                As an undergraduate researcher in the Shohamy Lab, I work with high-dimensional
                fMRI data and design neural networks to classify cognitive states from brain
                activity. I&apos;m drawn to problems that require both analytical rigor and creative
                problem-solving — whether that&apos;s optimizing a preprocessing pipeline for
                neuroimaging datasets or architecting a model that generalizes across subjects.
              </p>
              <p className="about-animate">
                Outside the lab, I&apos;m a Division I cross country and track athlete competing in
                the Ivy League. The discipline and resilience that come from elite athletics
                directly inform how I approach research — persistent, methodical, and always
                pushing for the next level.
              </p>
            </div>
          </div>

          {/* Photo */}
          <div className="about-animate flex justify-center md:justify-end">
            <div className="w-64 h-80 bg-bg-secondary rounded-t-full rounded-b-2xl overflow-hidden shadow-lg relative group border border-border-subtle hover:border-accent/30 transition-colors duration-500">
              <img
                src="/profile.jpg"
                alt="Ralph Brown"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="scroll-reveal mb-20">
          <h2 className="text-3xl font-serif text-text-primary mb-8 border-l-4 border-accent pl-4">
            Education
          </h2>
          <div className="bg-bg-secondary rounded-2xl p-8 border border-border-subtle">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-serif text-text-primary">{education.school}</h3>
                <p className="text-text-secondary">{education.degree}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent-muted rounded text-xs font-mono text-accent tracking-wider uppercase">
                  {education.expected}
                </span>
                <p className="text-sm text-text-tertiary mt-1">GPA: {education.gpa}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-tertiary uppercase tracking-wider mb-3">Relevant Coursework</p>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <span
                    key={course.name}
                    className={`px-3 py-1 rounded-full text-sm font-mono ${
                      course.status === 'in-progress'
                        ? 'bg-accent-muted text-accent border border-accent/30'
                        : 'bg-bg-tertiary text-text-secondary border border-border-subtle'
                    }`}
                  >
                    {course.name}
                    {course.status === 'in-progress' && (
                      <span className="ml-1 text-xs opacity-60">*</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="scroll-reveal mb-20">
          <h2 className="text-3xl font-serif text-text-primary mb-8 border-l-4 border-accent pl-4">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-bg-secondary rounded-2xl p-6 border border-border-subtle hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-glow/10"
              >
                <h3 className="text-lg font-serif text-text-primary mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="scroll-reveal">
          <h2 className="text-3xl font-serif text-text-primary mb-8 border-l-4 border-accent pl-4">
            Interests
          </h2>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 bg-bg-secondary border border-border-subtle rounded-full text-text-secondary font-sans text-sm hover:border-accent/30 hover:text-accent transition-colors cursor-default"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
