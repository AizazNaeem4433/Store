import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionstring = process.env.DATABASE_URL
export const client = postgres(connectionstring as string, {prepare:false})
export const db = drizzle(client)

