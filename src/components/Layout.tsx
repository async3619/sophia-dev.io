import React, { useEffect } from 'react'

import { Container, CssBaseline } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'

import * as ChannelService from '@channel.io/channel-web-sdk-loader'

import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { FOOTER_ITEMS } from '@constants/footer'

import * as Styled from './Layout.styled'

export interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { mode } = useColorScheme()

  useEffect(() => {
    ChannelService.loadScript()
    ChannelService.boot({ pluginKey: 'eb4b2c86-9a99-4081-8c2d-9897be690491' })

    if (mode === 'dark') {
      ChannelService.setAppearance('dark')
    } else {
      ChannelService.setAppearance('light')
    }
  }, [mode])

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
