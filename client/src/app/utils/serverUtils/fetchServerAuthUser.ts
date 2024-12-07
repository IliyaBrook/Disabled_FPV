'use server'
import type { TFetchServerAuthUser } from '@/app/types/api.type'
import { fetchServer } from '@/app/utils/serverUtils/fetchServer'

export async function fetchServerAuthUser() {
  return await fetchServer<TFetchServerAuthUser>({
    endpoint: '/api/authUser',
    method: 'POST',
    includeAuth: true,
    throwError: false,
  })
}
