import { makeStore } from '@/app/store/store'
import { authUser } from '@/app/store/thunks'
import getServerSideToken from '@/app/utils/serverUtils/getServerSideToken'

export const getUserDataServer = async () => {
  const store = makeStore()
  const authToken = await getServerSideToken()
  const tokenValue = authToken?.value
  console.log('token value:', tokenValue)

  store.dispatch(authUser.endpoints.authUser.initiate(tokenValue))
  await Promise.all(store.dispatch(authUser.util.getRunningQueriesThunk()))
  const state = store.getState()
  return state?.authUser?.queries?.details
}
