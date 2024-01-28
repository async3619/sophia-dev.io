import { Container, CssBaseline } from '@mui/material'

import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { FOOTER_ITEMS } from '@constants/footer'

import * as Styled from './Layout.styled'

export interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Styled.Root>
      <CssBaseline />
      <Container maxWidth="sm">
        <Header />
        <Styled.Main>{children}</Styled.Main>
        <Footer items={FOOTER_ITEMS} />
      </Container>
    </Styled.Root>
  )
}
