import { useEffect, useRef } from 'react'
import { buildFlowiseTheme, FLOWISE_API_HOST, FLOWISE_CHATFLOW_ID } from '../../lib/flowiseTheme.js'

export default function FlowiseChatbot({ profile }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current || !FLOWISE_CHATFLOW_ID) return
    initialized.current = true

    let cancelled = false

    async function initChatbot() {
      try {
        const { default: Chatbot } = await import('flowise-embed/dist/web.js')

        if (cancelled) return

        Chatbot.init({
          chatflowid: FLOWISE_CHATFLOW_ID,
          apiHost: FLOWISE_API_HOST,
          theme: buildFlowiseTheme({
            fullName: profile?.full_name,
            avatarUrl: profile?.avatar_url,
          }),
        })
      } catch (err) {
        console.error('Flowise chatbot failed to load:', err)
        initialized.current = false
      }
    }

    initChatbot()

    return () => {
      cancelled = true
    }
  }, [profile?.full_name, profile?.avatar_url])

  return null
}
