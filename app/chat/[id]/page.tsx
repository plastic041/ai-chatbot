import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getChat } from '@/app/actions'
import { Chat } from '@/components/chat'
import { getPageSession } from '@/lib/session'

export const preferredRegion = 'home'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await getPageSession()

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id, session.user.userId)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await getPageSession()

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const chat = await getChat(params.id, session.user.userId)

  if (!chat) {
    notFound()
  }

  if (chat?.userId !== session?.user?.userId) {
    notFound()
  }

  return <Chat id={chat.id} initialMessages={chat.messages} />
}
