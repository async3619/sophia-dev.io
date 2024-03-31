import React from 'react'

import { Box, Fade } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { HeaderIconButton } from '@components/HeaderIconButton'

export function ThemeButton() {
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = React.useState(false)
  const isDarkMode = mode === 'dark'

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleSetModeClick = React.useCallback(() => {
    setMode(isDarkMode ? 'light' : 'dark')
  }, [isDarkMode, setMode])

  if (!mounted) {
    return <Box width={40} height={40} />
  }

  return (
    <Fade in={mounted}>
      <HeaderIconButton
        tooltip={isDarkMode ? '다크 모드 끄기' : '다크 모드 켜기'}
        onClick={handleSetModeClick}
      >
        {!isDarkMode ? (
          <DarkModeIcon fontSize="small" />
        ) : (
          <Brightness7Icon fontSize="small" />
        )}
      </HeaderIconButton>
    </Fade>
  )
}
