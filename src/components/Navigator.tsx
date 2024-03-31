import { useRouter } from 'next/router'

import { Stack, Typography } from '@mui/material'
import { useUIStore } from '@stores/ui'

import * as Styled from './Navigator.styled'
import { useEffect, useRef } from 'react'

interface RouteItem {
  href: string
  label: string
  description: string
}

const ROUTES: RouteItem[] = [
  { href: '/', label: '/home/', description: '인덱스 페이지 입니다' },
  {
    href: '/blog',
    label: '/blog/',
    description: '개인적인 경험과 생각을 열거합니다',
  },
  {
    href: '/review',
    label: '/review/',
    description: '영화 및 음악을 리뷰합니다',
  },
]

export function Navigator() {
  const { pathname, asPath } = useRouter()
  const currentPath = asPath ?? pathname
  const lastPath = useRef(currentPath)
  const closeMenu = useUIStore((state) => state.closeMenu)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeMenu])

  useEffect(() => {
    if (lastPath.current !== currentPath) {
      closeMenu()
      lastPath.current = currentPath
    }
  }, [closeMenu, currentPath])

  return (
    <>
      <Styled.Root>
        <Stack direction="column" spacing={1}>
          {ROUTES.map(({ href, label, description }) => {
            const content = (
              <>
                <span>{label}</span>
                <Styled.Spacer />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  whiteSpace="nowrap"
                >
                  {description}
                </Typography>
              </>
            )

            if (asPath === href) {
              return (
                <Styled.SelectedItem key={href}>{content}</Styled.SelectedItem>
              )
            }

            return (
              <Styled.Item key={href} href={href}>
                {content}
              </Styled.Item>
            )
          })}
        </Stack>
      </Styled.Root>
      <Styled.Backdrop onMouseDown={closeMenu} />
    </>
  )
}
