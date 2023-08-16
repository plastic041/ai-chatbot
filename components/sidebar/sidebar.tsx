'use client'

import * as React from 'react'

import { IconButton } from '@radix-ui/themes'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { IconSidebar } from '@/components/ui/icons'

export interface SidebarProps {
  children?: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton variant="soft">
          <IconSidebar className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </IconButton>
      </SheetTrigger>
      <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="text-sm">Chat History</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
