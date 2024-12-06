import type { TDir } from '@/app/types'
import { getDir } from '@/app/utils/getDir'
import { useEffect, useState } from 'react'

const useGetDir = (): TDir => {
  const [dir, setDir] = useState<TDir>('rtl')
  useEffect(() => {
    const clientDir = getDir()
    setDir(clientDir)
  }, [])
  return dir
}

export default useGetDir
