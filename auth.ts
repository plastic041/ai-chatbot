import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

const nextAuth =
  // {
  //   handlers,
  //   auth,
  //   CSRF_experimental // will be removed in future
  // }
  NextAuth({
    providers: [
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      })
    ],
    callbacks: {
      jwt({ token, profile }) {
        if (profile) {
          token.id = profile.id
          token.image = profile.image
        }
        return token
      }
      // authorized({ auth }) {
      //   return !!auth?.user // this ensures there is a logged in user for -every- request
      // }
    },
    pages: {
      signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
    }
  })

// const next = {
//   GET: nextAuth.handler,
//   POST: nextAuth.handler,
//   auth: nextAuth.auth,
//   CSRF_experimental: nextAuth.CSRF_experimental
// }

// export default next

console.log('nextAuth', nextAuth)

export const GET = nextAuth.handler
export const POST = nextAuth.handler
export const auth = nextAuth.auth
export const CSRF_experimental = nextAuth.CSRF_experimental
