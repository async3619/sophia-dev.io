import React from 'react'

import { Box, Fade, Tooltip } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { Button } from './ThemeButton.styled'

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
    <Tooltip title={isDarkMode ? '다크 모드 끄기' : '다크 모드 켜기'}>
      <Fade in={mounted}>
        <Button onClick={handleSetModeClick} size="small">
          {!isDarkMode ? (
            <DarkModeIcon fontSize="small" />
          ) : (
            <Brightness7Icon fontSize="small" />
          )}
        </Button>
      </Fade>
    </Tooltip>
  )
}
