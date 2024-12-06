import { headers } from 'next/headers'

export default async function getCurrentPath(): Promise<string> {
  // return headersList.get('referer')
  const headersList = await headers()
  return headersList.get('x-path') || '/'
}
