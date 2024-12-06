import 'server-only'
import { headers } from 'next/headers'

export default async function getCurrentPathServer(): Promise<string> {
  const headersList = await headers()
  return headersList.get('referer') || '/'
}
