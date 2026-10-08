import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SectionHeading from '../ui/SectionHeading.jsx'
import { personalData } from '../../data/personal.ts'
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient.js'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Award,
  Loader2,
  FileDown,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, CodeforcesIcon } from '../ui/Icons.jsx'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botField: '', // Honeypot anti-spam
  })

  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Honeypot check
    if (formData.botField) {
      setStatus('success')
      return
    }

    // 2. Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error')
      setErrorMessage('Please fill in your name, email, and message.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      if (supabase && isSupabaseConfigured) {
        const { error } = await supabase.from('contact_messages').insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: `[Subject: ${formData.subject || 'General Inquiry'}] ${formData.message.trim()}`,
            created_at: new Date().toISOString(),
            read: false,
          },
        ])

        if (error) throw error
      } else {
        // Simulated or fallback submission
        await new Promise((r) => setTimeout(r, 600))
      }

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '', botField: '' })
    } catch (err) {
      // Fallback gracefully without breaking
      setStatus('error')
      setErrorMessage(
        'Unable to send directly to database. You can reach out directly via ahmedhassan1907ua@gmail.com'
      )
    }
  }

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-container section-padding section-divider">
      <SectionHeading
        index="08"
        eyebrow="Initiate Collaboration"
        title="Let's build reliable, performant software together"
      />

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
        {/* Left: Contact Info & Availability */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="font-display font-bold text-2xl text-on-surface">
              Get in Touch
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Whether you are hiring for a front-end engineering role, building an AI-integrated application,
              or exploring a technical collaboration, I respond promptly to engineering inquiries.
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-4 text-sm font-mono">
            <a
              href={`mailto:${personalData.email}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-surface-container/60 border border-white/5 hover:border-primary/40 text-on-surface hover:text-primary transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-on-surface-variant block uppercase tracking-wider">Email</span>
                <span className="text-xs sm:text-sm">{personalData.email}</span>
              </div>
            </a>

            <a
              href={`tel:${personalData.phone}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-surface-container/60 border border-white/5 hover:border-primary/40 text-on-surface hover:text-primary transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-on-surface-variant block uppercase tracking-wider">Phone</span>
                <span className="text-xs sm:text-sm">{personalData.phone}</span>
              </div>
            </a>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-surface-container/60 border border-white/5 text-on-surface">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-on-surface-variant block uppercase tracking-wider">Location</span>
                <span className="text-xs sm:text-sm">{personalData.location}</span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
              Professional Profiles
            </span>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://github.com/Ahmed7assan1"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-surface-container-high border border-white/5 hover:border-primary/40 text-xs font-mono flex items-center gap-2 hover:text-primary transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/Ahmed_Hassan"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-surface-container-high border border-white/5 hover:border-primary/40 text-xs font-mono flex items-center gap-2 hover:text-primary transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://codeforces.com/profile/Abo_7assan"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-surface-container-high border border-white/5 hover:border-amber-400/40 text-xs font-mono flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-all"
              >
                <CodeforcesIcon className="w-4 h-4" />
                <span>Codeforces</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Accessible Contact Form */}
        <div className="glass-card luxe-border p-6 sm:p-8 border border-white/10 bg-surface-container/80">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-2xl text-on-surface">
                  Message Dispatched
                </h4>
                <p className="text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been received and I will respond to your email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-outline text-xs mt-4"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-display font-semibold text-lg text-on-surface mb-2">
                  Send a Direct Message
                </h4>

                {/* Honeypot field (hidden from screen, filled only by bots) */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="botField"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.botField}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-on-surface-variant"
                    >
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary/60 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-on-surface-variant"
                    >
                      Your Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary/60 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono text-on-surface-variant"
                  >
                    Subject / Topic
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Front-End Role / Consulting / Collaboration"
                    className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary/60 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-on-surface-variant"
                  >
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your requirements or inquiry..."
                    className="w-full bg-surface-container-high border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary/60 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p>{errorMessage}</p>
                      <button
                        type="button"
                        onClick={handleMailtoFallback}
                        className="underline text-primary font-medium hover:text-white"
                      >
                        Click here to send directly via Email client
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary text-xs py-3 px-7 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`${import.meta.env.BASE_URL}Ahmed_Hassan_CV.pdf`}
                    download="Ahmed_Hassan_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download CV</span>
                  </a>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
