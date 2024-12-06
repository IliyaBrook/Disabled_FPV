import 'server-only'
import type { TFetchServerAuthUser } from '@/app/types/api.type'
import { fetchServer } from '@/app/utils/serverUtils/fetchServer'

export async function fetchServerAuthUser() {
  return await fetchServer({
    endpoint: '/api/authUser',
    method: 'POST',
    includeAuth: true,
  })<TFetchServerAuthUser>()
}
