'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { type Chat, ServerActionResult } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import {
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Tooltip,
  Flex,
  IconButton,
  Card,
  Text
} from '@radix-ui/themes'
import { IconShare, IconSpinner, IconTrash } from '@/components/ui/icons'

interface SidebarActionsProps {
  chat: Chat
  removeChat: (args: { id: string; path: string }) => ServerActionResult<void>
}

export function SidebarActions({ chat, removeChat }: SidebarActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [isRemovePending, startRemoveTransition] = React.useTransition()
  const router = useRouter()

  return (
    <>
      <Flex gap="4" align="center">
        <Tooltip content="Delete chat">
          <IconButton
            variant="ghost"
            color="red"
            disabled={isRemovePending}
            onClick={() => setDeleteDialogOpen(true)}
          >
            <IconTrash />
            <span className="sr-only">Delete</span>
          </IconButton>
        </Tooltip>
      </Flex>
      <AlertDialog.Root
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your chat message and remove your data
            from our servers.
          </AlertDialogDescription>
          <AlertDialogCancel disabled={isRemovePending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemovePending}
            onClick={event => {
              event.preventDefault()
              startRemoveTransition(async () => {
                const result = await removeChat({
                  id: chat.id,
                  path: chat.path
                })

                if (result && 'error' in result) {
                  toast.error(result.error)
                  return
                }

                setDeleteDialogOpen(false)
                router.refresh()
                router.push('/')
                toast.success('Chat deleted')
              })
            }}
          >
            {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog.Root>
    </>
  )
}
