'use server'

import { apiUrl } from '@/app/utils/constants'
import getServerSideToken from '@/app/utils/fetchData/getServerSideToken'

interface FetchServerOptions extends NextFetchRequestConfig, RequestInit {
  endpoint: string
  includeAuth?: boolean
  throwError?: boolean
  next?: NextFetchRequestConfig | undefined
}

/**
 * Fetches data from the server with specified options.
 *
 * @template T - The expected type of the response data.
 * @param {FetchServerOptions} options - The options for the fetch request.
 * @returns {Promise<T | null>} A promise that resolves to the response data parsed as JSON, or `null` if parsing fails and `throwError` is `false`.
 * @throws {Error} Throws an error if the response status is not OK and `throwError` is `true`, or if JSON parsing fails.
 */
export const fetchServer = async <T extends any>({
  endpoint,
  method = 'GET',
  headers = {},
  body,
  includeAuth = true,
  throwError = true,
  cache = 'default',
  credentials = 'same-origin',
  ...otherOptions
}: FetchServerOptions): Promise<T | null> => {
  const authToken = await getServerSideToken()
  const authCookie = includeAuth ? authToken : null

  const fetchHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
    ...(authCookie && { Cookie: `${authCookie.name}=${authCookie.value}` }),
  }

  const response = await fetch(`${apiUrl}${endpoint}`, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : undefined,
    cache,
    credentials,
    ...otherOptions,
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
