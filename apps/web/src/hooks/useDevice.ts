"use client"

import { useWindowSize } from "usehooks-ts"

const MOBILE_BREAKPOINT = 640
const TABLET_BREAKPOINT = 768
const LAPTOP_BREAKPOINT = 1024
const DESKTOP_BREAKPOINT = 1280
const useDevice = () => {
  const { width } = useWindowSize({
    initializeWithValue: false,
  })

  if (!width) {
    return null
  }

  const isAboveMobile = width >= MOBILE_BREAKPOINT
  const isAboveTablet = width >= TABLET_BREAKPOINT
  const isAboveLaptop = width >= LAPTOP_BREAKPOINT
  const isAboveDesktop = width >= DESKTOP_BREAKPOINT
  const isMobile = !isAboveMobile
  const isTablet = isAboveMobile && !isAboveTablet
  const isLaptop = isAboveTablet && !isAboveLaptop
  const isDesktop = isAboveLaptop && !isAboveDesktop
  const isWideScreen = isAboveDesktop

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isWideScreen,

    isAboveMobile,
    isAboveTablet,
    isAboveLaptop,
    isAboveDesktop,
  }
}

export default useDevice
