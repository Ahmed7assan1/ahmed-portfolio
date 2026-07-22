import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout({ profile, socialLinks, children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header fullName={profile?.full_name} />
      <main className="flex-1">{children}</main>
      <Footer fullName={profile?.full_name} socialLinks={socialLinks} />
    </div>
  )
}
