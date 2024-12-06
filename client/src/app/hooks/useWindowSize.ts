import { useEffect, useState } from 'react'

interface WindowSize {
  screenWidth: number
  screenHeight: number
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    screenWidth: 0,
    screenHeight: 0,
  })

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export default useWindowSize
