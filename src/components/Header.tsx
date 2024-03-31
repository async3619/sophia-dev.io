import { Stack, Typography, useTheme } from '@mui/material'

import { ThemeButton } from '@components/ThemeButton'
import { LangSwitch } from '@components/LangSwitch'

import * as Styled from './Header.styled'
import { useEffect, useState } from 'react'
import { STICKY_OFFSET } from './Header.styled'
import Link from 'next/link'

const PAGE_DOMAIN = 'sophia-dev.io'

export interface HeaderProps {}

export function Header({}: HeaderProps) {
  const theme = useTheme()
  const [isStick, setIsStick] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const isStick = offset >= parseInt(theme.spacing(STICKY_OFFSET), 10)

      setIsStick(isStick)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [theme])

  return (
    <Styled.Root stick={isStick}>
      <Link href="/">
        <Typography
          component="span"
          variant="body1"
          fontFamily="'Consolas', monospace"
          fontWeight={800}
        >
          {PAGE_DOMAIN}
        </Typography>
      </Link>
      <Stack spacing={1} direction="row" alignItems="center">
        <LangSwitch />
        <ThemeButton />
      </Stack>
    </Styled.Root>
  )
}
