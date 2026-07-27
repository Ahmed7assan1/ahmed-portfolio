import { useState } from 'react'
import Layout from '../components/layout/Layout.jsx'
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import Stats from '../components/sections/Stats.jsx'
import Skills from '../components/sections/Skills.jsx'
import Projects from '../components/sections/Projects.jsx'
import ExperienceEducation from '../components/sections/ExperienceEducation.jsx'
import Certificates from '../components/sections/Certificates.jsx'
import Contact from '../components/sections/Contact.jsx'
import { Loader, ErrorState } from '../components/ui/Loader.jsx'
import IntroLoader from '../components/ui/IntroLoader.jsx'
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD.js'

const INTRO_KEY = 'portfolio-intro-shown'

export default function Home() {
  const { data: profiles, loading, error } = useSupabaseCRUD('profile', { orderBy: null })
  const { data: socialLinks } = useSupabaseCRUD('social_links', { orderBy: 'order_index' })
  const [introDone, setIntroDone] = useState(() => sessionStorage.getItem(INTRO_KEY) === '1')

  const profile = profiles?.[0]

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, '1')
    setIntroDone(true)
  }

  return (
    <>
      {!introDone && <IntroLoader onComplete={handleIntroComplete} />}
      {introDone &&
        (loading ? (
          <Loader label="Loading portfolio" />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <Layout profile={profile} socialLinks={socialLinks}>
            <Hero profile={profile} />
            <About profile={profile} />
            <Stats profile={profile} />
            <Skills />
            <Projects />
            <ExperienceEducation />
            <Certificates />
            <Contact profile={profile} />
          </Layout>
        ))}
    </>
  )
}
