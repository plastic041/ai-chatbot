import { getChats, removeChat } from '@/app/actions'
import { SidebarActions } from '@/components/sidebar/sidebar-actions'
import { SidebarItem } from '@/components/sidebar/sidebar-item'
import { Flex } from '@radix-ui/themes'

export interface SidebarListProps {
  userId?: string
}

export async function SidebarList({ userId }: SidebarListProps) {
  const chats = await getChats(userId)

  return (
    <Flex direction="column" className="flex-1 overflow-auto" px="4">
      {chats?.length ? (
        <Flex direction="column" gap="2">
          {chats.map(
            chat =>
              chat && (
                <SidebarItem key={chat?.id} chat={chat}>
                  <SidebarActions chat={chat} removeChat={removeChat} />
                </SidebarItem>
              )
          )}
        </Flex>
      ) : (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No chat history</p>
        </div>
      )}
    </Flex>
  )
}
