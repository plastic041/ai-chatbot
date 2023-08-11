import { lucia } from 'lucia'
import { nextjs } from 'lucia/middleware'
import { github } from '@lucia-auth/oauth/providers'
import { betterSqlite3 } from '@lucia-auth/adapter-sqlite'
import sqlite from 'better-sqlite3'
import 'lucia/polyfill/node'

const db = sqlite('./main.db')

db.exec(`
CREATE TABLE IF NOT EXISTS user (
  id VARCHAR(15) PRIMARY KEY,
  github_username VARCHAR(31) NOT NULL
);
CREATE TABLE IF NOT EXISTS user_key (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(15) NOT NULL,
  hashed_password VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE IF NOT EXISTS user_session (
  id VARCHAR(127) PRIMARY KEY,
  user_id VARCHAR(15) NOT NULL,
  active_expires BIGINT NOT NULL,
  idle_expires BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);
`)

export const auth = lucia({
  adapter: betterSqlite3(db, {
    user: 'user',
    key: 'user_key',
    session: 'user_session'
  }),
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs(),
  sessionCookie: {
    expires: false
  },

  getUserAttributes: data => {
    return {
      githubUsername: data.github_username
    }
  }
})

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
})

export type Auth = typeof auth
