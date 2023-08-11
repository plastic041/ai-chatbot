import { getPageSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await getPageSession()
  if (session) redirect('/')
  return (
    <>
      <h1>Sign in</h1>
      <a href="/sign-in/github">Sign in with Github</a>
    </>
  )
}

export default Page
