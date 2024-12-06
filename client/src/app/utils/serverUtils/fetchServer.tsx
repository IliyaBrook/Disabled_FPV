import 'server-only'

import { apiUrl } from '@/app/utils/constants'
import { cookies } from 'next/headers'

interface FetchServerOptions {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  includeAuth?: boolean
}

export async function fetchServer<T>({
  endpoint,
  method = 'GET',
  headers = {},
  body,
  includeAuth = true,
}: FetchServerOptions): Promise<T> {
  const cookieStore = await cookies()
  const authCookie = includeAuth ? cookieStore.get('auth_token') : null

  const fetchHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
    ...(authCookie && { Cookie: `${authCookie.name}=${authCookie.value}` }),
  }

  const response = await fetch(`${apiUrl}${endpoint}`, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
  })

  console.log(`fetchServer [${method}] ${endpoint} response:`, response)

  if (!response.ok) {
    const errorText = await response.text()
    console.error(`fetchServer error: ${errorText}`)
    throw new Error(
      `Request failed with status ${response.status}: ${errorText}`
    )
  }

  return response.json()
}
