import * as React from 'react'
import Link from 'next/link'

import { clearChats } from '@/app/actions'
import { Button, Flex } from '@radix-ui/themes'
import { Sidebar } from '@/components/sidebar/sidebar'
import { SidebarList } from '@/components/sidebar/sidebar-list'
import { SidebarFooter } from '@/components/sidebar/sidebar-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { ClearHistory } from '@/components/clear-history'
import { UserMenu } from '@/components/user-menu'
import { getPageSession } from '@/lib/session'

export async function Header() {
  const session = await getPageSession()

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <Flex align="center" gap="4">
        {session && (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              <SidebarList userId={session?.user.userId} />
            </React.Suspense>
            <SidebarFooter>
              <ThemeToggle />
              <ClearHistory clearChats={clearChats} />
            </SidebarFooter>
          </Sidebar>
        )}
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="outline" asChild className="-ml-2">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </Flex>
    </header>
  )
}
