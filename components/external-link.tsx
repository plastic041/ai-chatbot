import { Box, Link, Text } from '@radix-ui/themes'

export function ExternalLink({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Box asChild className="inline-flex flex-1 justify-center gap-x-0.5">
      <Link href={href} target="_blank">
        <Text as="span">{children}</Text>
        <Box asChild mt="1">
          <svg
            aria-hidden="true"
            viewBox="0 0 6 6"
            width="7"
            height="7"
            className="opacity-70"
          >
            <path
              d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
              fill="currentColor"
            ></path>
          </svg>
        </Box>
      </Link>
    </Box>
  )
}
