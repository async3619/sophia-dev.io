import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Stack, Typography, useTheme } from '@mui/material'

import { ThemeButton } from '@components/ThemeButton'
import { Navigator } from '@components/Navigator'
import { HeaderText } from '@components/HeaderText'

import { useUIStore } from '@stores/ui'

import * as Styled from './Header.styled'
import { HeaderIconButton } from '@components/HeaderIconButton'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

const PAGE_DOMAIN = 'sophia-dev.io'

export interface HeaderProps {}

export function Header({}: HeaderProps) {
  const theme = useTheme()
  const [isStick, setIsStick] = useState(false)
  const { pathname, asPath } = useRouter()

  const isTitleIntersecting = useUIStore((state) => state.isTitleIntersecting)
  const currentTitle = useUIStore((state) => state.currentTitle)

  const toggleMenu = useUIStore((state) => state.toggleMenu)
  const menuOpen = useUIStore((state) => state.menuOpen)

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
      <HeaderIconButton tooltip="메뉴 열기" onClick={toggleMenu}>
        <MenuRoundedIcon fontSize="small" />
      </HeaderIconButton>
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
          <Link href={pathname} as={asPath} className="title">
            <Typography component="span" variant="body1" fontWeight={800}>
              {currentTitle || PAGE_DOMAIN}
            </Typography>
          </Link>
        </HeaderText>
      </Styled.TitleContainer>
      <Stack spacing={1} direction="row" alignItems="center">
        <ThemeButton />
      </Stack>
      {menuOpen && <Navigator />}
    </Styled.Root>
  )
}
