// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { ChatMessageActions } from './chat-message-actions'
import { Avatar, Flex, Text } from '@radix-ui/themes'

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <Avatar
        fallback={message.role === 'user' ? <IconUser /> : <IconOpenAI />}
        highContrast
        variant={message.role === 'user' ? 'soft' : 'solid'}
        size="2"
      />
      <Flex className="flex-1" ml="2" px="1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return (
                <Text as="p" className="mb-2 last:mb-0">
                  {children}
                </Text>
              )
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <Text className="mt-1 animate-pulse cursor-default">▍</Text>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        <ChatMessageActions message={message} />
      </Flex>
    </div>
  )
}
