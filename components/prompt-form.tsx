import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { Box, IconButton, Tooltip } from '@radix-ui/themes'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ArrowElbowDownLeft, Plus } from '@phosphor-icons/react'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background pl-4 pr-8 sm:rounded-md sm:border sm:pl-8 sm:pr-12">
        {/* <Tooltip content="New Chat">
          <IconButton
            variant="outline"
            onClick={e => {
              e.preventDefault()
              router.refresh()
              router.push('/')
            }}
            className={cn('absolute left-0 top-4 bg-background sm:left-4')}
          >
            <Plus />
            <span className="sr-only">New Chat</span>
          </IconButton>
        </Tooltip> */}
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent py-[1.3rem] pr-4 focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip content="Send Message">
            <IconButton
              variant="classic"
              type="submit"
              disabled={isLoading || input === ''}
            >
              <ArrowElbowDownLeft />
              <span className="sr-only">Send message</span>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
