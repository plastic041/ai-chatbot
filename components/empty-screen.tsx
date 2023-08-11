import { UseChatHelpers } from 'ai/react'

import { Card, Flex, Link, Text } from '@radix-ui/themes'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n'
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <Flex className="mx-auto max-w-2xl px-4">
      <Card className="bg-background" size="5">
        <Text weight="bold" size="8" mb="4" as="p">
          Welcome to Next.js AI Chatbot!
        </Text>
        <Text color="gray" as="p" mb="1">
          This is an open source AI chatbot app template built with{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
          <ExternalLink href="https://vercel.com/storage/kv">
            Vercel KV
          </ExternalLink>
          .
        </Text>
        <Text color="gray" as="p">
          You can start a conversation here or try the following examples:
        </Text>
        <Flex mt="4" direction="column" gap="1">
          {exampleMessages.map((message, index) => (
            <Flex key={index} asChild align="center" gap="1">
              <Link onClick={() => setInput(message.message)}>
                <IconArrowRight />
                {message.heading}
              </Link>
            </Flex>
          ))}
        </Flex>
      </Card>
    </Flex>
  )
}
