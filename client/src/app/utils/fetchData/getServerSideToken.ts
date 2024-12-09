'use server'
import { cookies } from 'next/headers'

export default async function getServerSideToken() {
  const cookieStore = await cookies()
  return cookieStore.get('auth_token')
}
