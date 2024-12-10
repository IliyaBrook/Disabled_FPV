import { useEffect, useState } from 'react'

interface WindowSize {
  screenWidth: number
  screenHeight: number
}

const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export default useWindowSize
