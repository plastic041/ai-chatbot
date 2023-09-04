import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { IconButton, Tooltip } from '@radix-ui/themes'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { ArrowElbowDownLeft } from '@phosphor-icons/react'

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
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background pr-12 sm:rounded-md sm:border sm:pl-4 sm:pr-16">
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
