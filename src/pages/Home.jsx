import { useState } from 'react'
import Layout from '../components/layout/Layout.jsx'
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import Skills from '../components/sections/Skills.jsx'
import Projects from '../components/sections/Projects.jsx'
import Experience from '../components/sections/Experience.jsx'
import Education from '../components/sections/Education.jsx'
import Certifications from '../components/sections/Certifications.jsx'
import ProblemSolving from '../components/sections/ProblemSolving.jsx'
import GithubShowcase from '../components/sections/GithubShowcase.jsx'
import Contact from '../components/sections/Contact.jsx'
import IntroLoader from '../components/ui/IntroLoader.jsx'
import { personalData } from '../data/personal.ts'

const INTRO_KEY = 'portfolio-intro-shown'

export default function Home() {
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem(INTRO_KEY) === '1')
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, '1')
    setIntroDone(true)
  }

  return (
    <>
      {!introDone && <IntroLoader onComplete={handleIntroComplete} />}
      {introDone && (
        <Layout onSelectProject={(id) => setSelectedProjectId(id)}>
          {/* 1. Hero Section */}
          <Hero profile={personalData} />

          {/* 2. About Story */}
          <About />

          {/* 3. Categorized Skills */}
          <Skills />

          {/* 4. Featured Projects Showcase & Flagship FurniVision */}
          <Projects initialProjectId={selectedProjectId} />

          {/* 5. Professional Experience Timeline */}
          <Experience />

          {/* 6. Education & Professional Programs (ITI & DEPI) */}
          <Education />

          {/* 7. Certifications & Achievements (ECPC Rank #55) */}
          <Certifications />

          {/* 8. Problem Solving / Codeforces Integration */}
          <ProblemSolving />

          {/* 9. GitHub Integration Showcase */}
          <div className="section-container">
            <GithubShowcase />
          </div>

          {/* 10. Contact Section */}
          <Contact />
        </Layout>
      )}
    </>
  )
}
