import BehanceIcon from '../../SVG/behance.svg?raw'
import GithubIcon from '../../SVG/github.svg?raw'
import FacebookIcon from '../../SVG/facebook.svg?raw'
import InstagramIcon from '../../SVG/instagram.svg?raw'
import LinkedInIcon from '../../SVG/linkedin.svg?raw'
import MetaIcon from '../../SVG/meta.svg?raw'
import PintrestIcon from '../../SVG/pintrest.svg?raw'
import RedditIcon from '../../SVG/reddit.svg?raw'
import SnapchatIcon from '../../SVG/snapchat.svg?raw'
import TiktokIcon from '../../SVG/tiktok.svg?raw'
import TwitchIcon from '../../SVG/twitch.svg?raw'
import WhatsAppIcon from '../../SVG/whatsapp.svg?raw'
import XIcon from '../../SVG/x.svg?raw'
import YoutubeIcon from '../../SVG/youtube.svg?raw'

const iconMap = {
  behance: BehanceIcon,
  github: GithubIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  meta: MetaIcon,
  pintrest: PintrestIcon,
  reddit: RedditIcon,
  snapchat: SnapchatIcon,
  tiktok: TiktokIcon,
  twitch: TwitchIcon,
  whatsapp: WhatsAppIcon,
  x: XIcon,
  twitter: XIcon,
  youtube: YoutubeIcon,
}

export const platformIconMap = {
  behance: 'behance',
  github: 'github',
  facebook: 'facebook',
  instagram: 'instagram',
  linkedin: 'linkedin',
  meta: 'meta',
  pinterest: 'pintrest',
  pintrest: 'pintrest',
  reddit: 'reddit',
  snapchat: 'snapchat',
  tiktok: 'tiktok',
  twitch: 'twitch',
  whatsapp: 'whatsapp',
  x: 'x',
  twitter: 'x',
  youtube: 'youtube',
}

export const socialPlatforms = [
  { id: 'github', label: 'GitHub' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'behance', label: 'Behance' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'x', label: 'X / Twitter' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'snapchat', label: 'Snapchat' },
  { id: 'reddit', label: 'Reddit' },
  { id: 'twitch', label: 'Twitch' },
  { id: 'pintrest', label: 'Pinterest' },
  { id: 'meta', label: 'Meta' },
]

export function getSocialIcon(platformOrIcon) {
  const key = (platformOrIcon || '').toLowerCase().trim()
  const mapped = platformIconMap[key]
  const iconKey = mapped || key
  return iconMap[iconKey] || null
}

export function SocialIcon({ platform, className = '' }) {
  const svgContent = getSocialIcon(platform)
  if (!svgContent) return null

  const clean = svgContent
    .replace(/<defs>.*?<\/defs>/g, '')
    .replace(/\.cls-\d+\{fill:[^;]+;\}/g, '')
    .replace(/class="cls-\d+"/g, '')
    .replace('<svg', `<svg class="${className}"`)

  return <span dangerouslySetInnerHTML={{ __html: clean }} />
}
