import Header from './Header.jsx'
import Footer from './Footer.jsx'
import AuroraBackground from '../ui/AuroraBackground.jsx'
import CursorGlow from '../ui/CursorGlow.jsx'
import ScrollProgress from '../ui/ScrollProgress.jsx'

export default function Layout({ profile, socialLinks, children }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AuroraBackground />
      <div className="grain-overlay fixed inset-0 -z-10" aria-hidden="true" />
      <CursorGlow />
      <ScrollProgress />
      <Header fullName={profile?.full_name} />
      <main className="flex-1">{children}</main>
      <Footer fullName={profile?.full_name} socialLinks={socialLinks} />
    </div>
  )
}
