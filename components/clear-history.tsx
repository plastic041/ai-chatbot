'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { ServerActionResult } from '@/lib/types'
import { Button, AlertDialog, Flex } from '@radix-ui/themes'
import { Spinner } from '@phosphor-icons/react'

interface ClearHistoryProps {
  clearChats: () => ServerActionResult<void>
}

export function ClearHistory({ clearChats }: ClearHistoryProps) {
  const [open, setOpen] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>
        <Button variant="ghost" disabled={isPending}>
          {isPending && <Spinner className="mr-2" />}
          Clear history
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This will permanently delete your chat history and remove your data
          from our servers.
        </AlertDialog.Description>
        <Flex>
          <AlertDialog.Cancel disabled={isPending}>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action
            disabled={isPending}
            onClick={event => {
              event.preventDefault()
              startTransition(async () => {
                const result = await clearChats()

                if (result && 'error' in result) {
                  toast.error(result.error)
                  return
                }

                setOpen(false)
                router.push('/')
              })
            }}
          >
            {isPending && <Spinner className="mr-2 animate-spin" />}
            Delete
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
