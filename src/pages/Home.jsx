import Layout from '../components/layout/Layout.jsx'
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import Skills from '../components/sections/Skills.jsx'
import Projects from '../components/sections/Projects.jsx'
import ExperienceEducation from '../components/sections/ExperienceEducation.jsx'
import Certificates from '../components/sections/Certificates.jsx'
import Contact from '../components/sections/Contact.jsx'
import { Loader, ErrorState } from '../components/ui/Loader.jsx'
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD.js'

export default function Home() {
  const { data: profiles, loading, error } = useSupabaseCRUD('profile', { orderBy: null })
  const { data: socialLinks } = useSupabaseCRUD('social_links', { orderBy: 'order_index' })

  const profile = profiles?.[0]

  if (loading) return <Loader label="Loading portfolio" />
  if (error) return <ErrorState message={error} />

  return (
    <Layout profile={profile} socialLinks={socialLinks}>
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills />
      <Projects />
      <ExperienceEducation />
      <Certificates />
      <Contact profile={profile} />
    </Layout>
  )
}
