'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { type Chat } from '@/lib/types'
import { IconMessage, IconUsers } from '@/components/ui/icons'
import { Button, Flex, Link, Text, Tooltip } from '@radix-ui/themes'

interface SidebarItemProps {
  chat: Chat
  children: React.ReactNode
}

export function SidebarItem({ chat, children }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === chat.path

  if (!chat?.id) return null

  return (
    <Flex align="center" gap="2" height="6">
      <Flex asChild align="center" gap="2">
        <Button variant={isActive ? 'solid' : 'soft'} asChild>
          <NextLink href={chat.path} className="flex-1">
            <IconMessage />
            {chat.title}
          </NextLink>
        </Button>
      </Flex>
      {isActive && <>{children}</>}
    </Flex>
  )
}
