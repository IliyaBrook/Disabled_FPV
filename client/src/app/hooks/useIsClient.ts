import { useEffect, useState } from 'react'

const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState<boolean>(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

export default useIsClient
