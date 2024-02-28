import { Stack, Typography } from '@mui/material'
import * as Styled from './Navigator.styled'
import { useRouter } from 'next/router'

interface RouteItem {
  href: string
  label: string
}

const ROUTES: RouteItem[] = [
  { href: '/', label: '/home/' },
  { href: '/blog', label: '/blog/' },
  { href: '/review', label: '/review/' },
]

export function Navigator() {
  const { asPath } = useRouter()

  return (
    <Stack direction="row" spacing={1}>
      {ROUTES.map(({ href, label }) => {
        if (asPath === href) {
          return (
            <Typography variant="body1" fontWeight={800} key={href}>
              {label}
            </Typography>
          )
        }

        return (
          <Styled.Item key={href} href={href}>
            {label}
          </Styled.Item>
        )
      })}
    </Stack>
  )
}
