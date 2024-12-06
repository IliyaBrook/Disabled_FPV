import 'server-only'

import { apiUrl } from '@/app/utils/constants'
import { cookies } from 'next/headers'

interface FetchServerOptions {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  includeAuth?: boolean
  throwError?: boolean
}

/**
 * Fetches data from the server with specified options.
 *
 * @template T - The expected type of the response data.
 * @param {FetchServerOptions} options - The options for the fetch request.
 * @param {string} options.endpoint - The API endpoint to request.
 * @param {string} [options.method='GET'] - The HTTP method to use for the request.
 * @param {Object} [options.headers={}] - Additional headers to include in the request.
 * @param {Object} [options.body] - The request body, which will be stringified if provided.
 * @param {boolean} [options.includeAuth=true] - Whether to include authentication cookie in the request.
 * @param {boolean} [options.throwError=true] - Whether to throw an error on HTTP failure or JSON parsing error.
 * @returns {Promise<T | null>} A promise that resolves to the response data parsed as JSON, or `null` if parsing fails and `throwError` is `false`.
 * @throws {Error} Throws an error if the response status is not OK and `throwError` is `true`, or if JSON parsing fails.
 */
export async function fetchServer<T>({
  endpoint,
  method = 'GET',
  headers = {},
  body,
  includeAuth = true,
  throwError = true,
}: FetchServerOptions): Promise<T | null> {
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
  let responseBody: any
  try {
    responseBody = await response.json()
  } catch (err) {
    if (throwError) {
      throw new Error(`Failed to parse response JSON: ${err}`)
    }
    return null
  }
  if (!response.ok) {
    if (throwError) {
      throw new Error(
        `Request failed with status ${response.status}: ${JSON.stringify(responseBody)}`
      )
    }
    return responseBody
  }

  return responseBody
}
