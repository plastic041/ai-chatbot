import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

export default function IndexPage() {
  const id = nanoid()

  return (
    <Chat
      id={id}
      initialMessages={[
        {
          id: '1',
          content: 'Hello, world!',
          role: 'assistant',
          createdAt: new Date()
        },
        {
          id: '1',
          content: 'Hello, world!',
          role: 'user',
          createdAt: new Date()
        },
        {
          id: '1',
          content: 'Hello, world!',
          role: 'user',
          createdAt: new Date()
        }
      ]}
    />
  )
}
