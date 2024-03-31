import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Stack, Typography, useTheme } from '@mui/material'

import { ThemeButton } from '@components/ThemeButton'
import { LangSwitch } from '@components/LangSwitch'
import { HeaderText } from '@components/HeaderText'

import { useUIStore } from '@stores/ui'

import * as Styled from './Header.styled'

const PAGE_DOMAIN = 'sophia-dev.io'

export interface HeaderProps {}

export function Header({}: HeaderProps) {
  const theme = useTheme()
  const [isStick, setIsStick] = useState(false)
  const isTitleIntersecting = useUIStore((state) => state.isTitleIntersecting)
  const currentTitle = useUIStore((state) => state.currentTitle)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const isStick =
        offset >= parseInt(theme.spacing(Styled.STICKY_OFFSET), 10)

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
      <Styled.TitleContainer>
        <HeaderText enter={isTitleIntersecting}>
          <Link href="/" className="title">
            <Typography
              component="span"
              variant="body1"
              fontFamily="'Consolas', monospace"
              fontWeight={800}
            >
              {PAGE_DOMAIN}
            </Typography>
          </Link>
        </HeaderText>
        <HeaderText enter={!isTitleIntersecting}>
          <Link href="/" className="title">
            <Typography component="span" variant="body1" fontWeight={800}>
              {currentTitle || PAGE_DOMAIN}
            </Typography>
          </Link>
        </HeaderText>
      </Styled.TitleContainer>
      <Stack spacing={1} direction="row" alignItems="center">
        <LangSwitch />
        <ThemeButton />
      </Stack>
    </Styled.Root>
  )
}
