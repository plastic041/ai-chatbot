import { auth } from '@/auth/lucia'
import { cookies } from 'next/headers'
import { cache } from 'react'

export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies
  })
  return authRequest.validate()
})
