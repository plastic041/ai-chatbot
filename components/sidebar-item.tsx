'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { type Chat } from '@/lib/types'
import { cn } from '@/lib/utils'
import { IconMessage, IconUsers } from '@/components/ui/icons'
import { Flex, Link, Tooltip } from '@radix-ui/themes'

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
        <Link asChild highContrast={isActive}>
          <NextLink
            href={chat.path}
            className={cn(
              // 'group w-full pl-8 pr-16',
              // isActive && 'bg-accent',
              'flex-1'
            )}
          >
            {chat.sharePath ? (
              <Tooltip content="Shared chat">
                <IconUsers />
              </Tooltip>
            ) : (
              <IconMessage />
            )}
            {chat.title}
          </NextLink>
        </Link>
      </Flex>
      {isActive && <>{children}</>}
    </Flex>
  )
}
