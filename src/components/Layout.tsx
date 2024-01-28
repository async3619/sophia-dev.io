import * as Styled from './Layout.styled'
import { Container, CssBaseline } from '@mui/material'

export interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Styled.Root>
      <CssBaseline />
      <Styled.Main>
        <Container maxWidth="sm">{children}</Container>
      </Styled.Main>
    </Styled.Root>
  )
}
