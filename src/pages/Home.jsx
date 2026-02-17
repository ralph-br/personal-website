import { useState, useRef } from 'react'
import HeroSection from '../components/home/HeroSection'
import TimelinePath from '../components/home/TimelinePath'
import ParallaxElements from '../components/home/ParallaxElements'
import ProjectSection from '../components/home/ProjectSection'
import ProjectModal from '../components/home/ProjectModal'
import FutureCard from '../components/home/FutureCard'
import { projects } from '../data/projects'

export default function Home() {
  const [activeProject, setActiveProject] = useState(null)
  const timelineRef = useRef(null)

  return (
    <div className="bg-bg-primary">
      <HeroSection />

      <div ref={timelineRef} className="relative">
        <ParallaxElements containerRef={timelineRef} />
        <TimelinePath containerRef={timelineRef} />

        {projects.map((project, i) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={i}
            onOpen={setActiveProject}
          />
        ))}
      </div>

      <FutureCard />

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  )
}
