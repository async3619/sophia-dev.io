import ReactDOM from 'react-dom'

import { useRouter } from 'next/router'

import { Stack, Typography } from '@mui/material'
import { useUIStore } from '@stores/ui'

import * as Styled from './Navigator.styled'
import { useEffect } from 'react'

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
  const { asPath } = useRouter()
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

  return (
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
      {ReactDOM.createPortal(
        <Styled.Backdrop onMouseDown={closeMenu} />,
        document.getElementById('backdrop-root')!,
      )}
    </Styled.Root>
  )
}
