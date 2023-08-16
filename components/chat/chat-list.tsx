import { type Message } from 'ai'

import { Box, Flex } from '@radix-ui/themes'
import { ChatMessage } from './chat-message'

export interface ChatList {
  messages: Message[]
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      <Flex direction="column" gap="6">
        {messages.map(message => (
          <Box key={message.id}>
            <ChatMessage message={message} />
          </Box>
        ))}
      </Flex>
    </div>
  )
}
