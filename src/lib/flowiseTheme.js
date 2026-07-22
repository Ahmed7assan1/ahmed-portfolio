const CHAT_ICON =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  )

export function buildFlowiseTheme({ fullName, avatarUrl } = {}) {
  const firstName = fullName?.split(' ')?.[0] || 'Ahmed'
  const botAvatar =
    avatarUrl ||
    'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="%236366F1"/><text x="32" y="42" text-anchor="middle" fill="white" font-size="28" font-family="sans-serif" font-weight="700">${firstName.charAt(0).toUpperCase()}</text></svg>`
      )

  return {
    button: {
      backgroundColor: '#6366F1',
      right: 20,
      bottom: 20,
      size: 52,
      dragAndDrop: true,
      iconColor: 'white',
      customIconSrc: CHAT_ICON,
      autoWindowOpen: {
        autoOpen: false,
        openDelay: 2,
        autoOpenOnMobile: false,
      },
    },
    tooltip: {
      showTooltip: true,
      tooltipMessage: `Hi! I'm ${firstName}'s assistant 👋`,
      tooltipBackgroundColor: '#171f33',
      tooltipTextColor: '#dae2fd',
      tooltipFontSize: 14,
    },
    disclaimer: {
      title: 'Portfolio Assistant',
      message: `Ask me about ${firstName}'s projects, skills, experience, or how to get in touch.`,
      textColor: '#dae2fd',
      buttonColor: '#6366F1',
      buttonText: 'Start Chatting',
      buttonTextColor: '#ffffff',
      blurredBackgroundColor: 'rgba(11, 19, 38, 0.8)',
      backgroundColor: '#171f33',
    },
    customCSS: `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

      * {
        font-family: 'Plus Jakarta Sans', sans-serif !important;
      }

      button[part="button"] {
        background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%) !important;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.35) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
      }

      div[part="bot"] {
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45) !important;
        border-radius: 12px !important;
        overflow: hidden !important;
      }
    `,
    chatWindow: {
      showTitle: true,
      showAgentMessages: true,
      title: `${firstName}'s Portfolio Assistant`,
      titleAvatarSrc: botAvatar,
      welcomeMessage: `Hello! I'm here to help you learn about ${fullName || firstName}'s work, skills, and projects. What would you like to know?`,
      errorMessage: 'Something went wrong. Please try again or use the contact section.',
      backgroundColor: '#0b1326',
      height: Math.min(620, window.innerHeight - 80),
      width: Math.min(400, window.innerWidth - 32),
      fontSize: 15,
      starterPrompts: [
        'What projects have you built?',
        'What are your main skills?',
        'How can I contact you?',
      ],
      starterPromptFontSize: 14,
      clearChatOnReload: false,
      renderHTML: true,
      botMessage: {
        backgroundColor: '#171f33',
        textColor: '#dae2fd',
        showAvatar: true,
        avatarSrc: botAvatar,
      },
      userMessage: {
        backgroundColor: '#6366F1',
        textColor: '#ffffff',
        showAvatar: true,
        avatarSrc: CHAT_ICON,
      },
      textInput: {
        placeholder: 'Ask about my portfolio…',
        backgroundColor: '#131b2e',
        textColor: '#dae2fd',
        sendButtonColor: '#8083ff',
        maxChars: 500,
        maxCharsWarningMessage: 'Message is too long. Please keep it under 500 characters.',
        autoFocus: true,
        sendMessageSound: false,
        receiveMessageSound: false,
      },
      feedback: {
        color: '#c7c4d7',
      },
      dateTimeToggle: {
        date: true,
        time: true,
      },
      footer: {
        textColor: '#908fa0',
        text: 'Ask me anything about',
        company: fullName || 'this portfolio',
        companyLink: window.location.origin,
      },
    },
  }
}

export const FLOWISE_CHATFLOW_ID =
  import.meta.env.VITE_FLOWISE_CHATFLOW_ID || '9ba628e2-2c1f-48d2-b35d-0dc8440a58dd'

export const FLOWISE_API_HOST =
  import.meta.env.VITE_FLOWISE_API_HOST || 'https://abo7assan-furnivision-flowise.hf.space'
