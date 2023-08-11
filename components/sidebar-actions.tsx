'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { type Chat, ServerActionResult } from '@/lib/types'
import { cn, formatDate } from '@/lib/utils'
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
  Tooltip
} from '@radix-ui/themes'
import {
  IconShare,
  IconSpinner,
  IconTrash,
  IconUsers
} from '@/components/ui/icons'
import Link from 'next/link'
// import { badgeVariants } from '@/components/ui/badge'

interface SidebarActionsProps {
  chat: Chat
  removeChat: (args: { id: string; path: string }) => ServerActionResult<void>
  shareChat: (chat: Chat) => ServerActionResult<Chat>
}

export function SidebarActions({
  chat,
  removeChat,
  shareChat
}: SidebarActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const [isRemovePending, startRemoveTransition] = React.useTransition()
  const [isSharePending, startShareTransition] = React.useTransition()
  const router = useRouter()

  const copyShareLink = React.useCallback(async (chat: Chat) => {
    if (!chat.sharePath) {
      return toast.error('Could not copy share link to clipboard')
    }

    const url = new URL(window.location.href)
    url.pathname = chat.sharePath
    navigator.clipboard.writeText(url.toString())
    setShareDialogOpen(false)
    toast.success('Share link copied to clipboard', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontSize: '14px'
      },
      iconTheme: {
        primary: 'white',
        secondary: 'black'
      }
    })
  }, [])

  return (
    <>
      <div className="space-x-1">
        <Tooltip content="Share chat">
          <Button
            variant="ghost"
            className="hover:bg-background h-6 w-6 p-0"
            onClick={() => setShareDialogOpen(true)}
          >
            <IconShare />
            <span className="sr-only">Share</span>
          </Button>
        </Tooltip>
        <Tooltip content="Delete chat">
          <Button
            variant="ghost"
            className="hover:bg-background h-6 w-6 p-0"
            disabled={isRemovePending}
            onClick={() => setDeleteDialogOpen(true)}
          >
            <IconTrash />
            <span className="sr-only">Delete</span>
          </Button>
        </Tooltip>
      </div>
      <Dialog.Root open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogTitle>Share link to chat</DialogTitle>
          <DialogDescription>
            Anyone with the URL will be able to view the shared chat.
          </DialogDescription>
          <div className="space-y-1 rounded-md border p-4 text-sm">
            <div className="font-medium">{chat.title}</div>
            <div className="text-muted-foreground">
              {formatDate(chat.createdAt)} · {chat.messages.length} messages
            </div>
          </div>
          {chat.sharePath && (
            <Link
              href={chat.sharePath}
              className={cn(
                // badgeVariants({ variant: 'secondary' }),
                'mr-auto'
              )}
              target="_blank"
            >
              <IconUsers className="mr-2" />
              {chat.sharePath}
            </Link>
          )}
          <Button
            disabled={isSharePending}
            onClick={() => {
              startShareTransition(async () => {
                if (chat.sharePath) {
                  await new Promise(resolve => setTimeout(resolve, 500))
                  copyShareLink(chat)
                  return
                }

                const result = await shareChat(chat)

                if (result && 'error' in result) {
                  toast.error(result.error)
                  return
                }

                copyShareLink(result)
              })
            }}
          >
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              <>Copy link</>
            )}
          </Button>
        </DialogContent>
      </Dialog.Root>
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
