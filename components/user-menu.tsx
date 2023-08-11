'use client'

import { Button, Text } from '@radix-ui/themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@radix-ui/themes'
import { CaretDown } from '@phosphor-icons/react'
import { Session } from 'lucia'

export interface UserMenuProps {
  user: Session['user']
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          {/* {user?.userId? (
              <Image
                className="h-6 w-6 select-none rounded-full ring-1 ring-zinc-100/10 transition-opacity duration-300 hover:opacity-80"
                src={user?.image ? `${user.image}&s=60` : ''}
                alt={user.name ?? 'Avatar'}
              />
            ) : (
              <div className="flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
                {user?.name ? getUserInitials(user?.name) : null}
              </div>
            )} */}
          {user?.githubUsername}
          <CaretDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
        <DropdownMenuItem>
          {user?.githubUsername}
          {/* <div className="text-xs text-zinc-500">{user?.email}</div> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            fetch('/sign-out', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
            }).then(() => {
              window.location.href = '/'
            })
          }
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu.Root>
  )
}
