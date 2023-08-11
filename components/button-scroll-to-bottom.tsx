'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'
import { IconButton } from '@radix-ui/themes'
import { ArrowDown } from '@phosphor-icons/react'
import type { ComponentPropsWithoutRef } from 'react'

export function ButtonScrollToBottom({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof IconButton>) {
  const isAtBottom = useAtBottom()

  return (
    <IconButton
      variant="outline"
      className={cn(
        'absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2',
        isAtBottom ? 'opacity-0' : 'opacity-100',
        className
      )}
      onClick={() =>
        window.scrollTo({
          top: document.body.offsetHeight,
          behavior: 'smooth'
        })
      }
      {...props}
    >
      <ArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </IconButton>
  )
}
