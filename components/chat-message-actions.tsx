'use client'

import { type Message } from 'ai'

import { IconButton, Tooltip } from '@radix-ui/themes'
import { Check, Copy } from '@phosphor-icons/react'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.content)
  }

  return (
    <div
      className={cn(
        'ml-2 flex items-center justify-end transition-opacity group-hover:opacity-100 md:-right-10 md:-top-2 md:ml-auto md:opacity-0',
        className
      )}
      {...props}
    >
      <Tooltip content="Copy message">
        <IconButton variant="ghost" onClick={onCopy}>
          {isCopied ? <Check /> : <Copy />}
          <span className="sr-only">Copy message</span>
        </IconButton>
      </Tooltip>
    </div>
  )
}
