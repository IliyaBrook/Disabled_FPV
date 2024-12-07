'use server'
import type { TAuthSuccessResponse } from '@/app/types/api.type'
import { fetchServer } from '@/app/utils/serverUtils/fetchServer'

export async function fetchServerAuthUser() {
  return await fetchServer<TAuthSuccessResponse['data']>({
    endpoint: `/api/authUser`,
    method: 'POST',
    includeAuth: true,
    throwError: false,
  })
}
