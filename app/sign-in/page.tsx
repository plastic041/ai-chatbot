import { getPageSession } from '@/lib/session'
import { Box, Button, Card, Flex, Text } from '@radix-ui/themes'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await getPageSession()
  if (session) redirect('/')

  return (
    <Flex align="center" justify="center" mt="9">
      <Card className="mx-auto w-80">
        <Flex direction="column" gap="2">
          <Text size="8" weight="bold">
            Sign in
          </Text>
          <Button asChild variant="classic">
            <a href="/sign-in/github">Sign in with Github</a>
          </Button>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Page
