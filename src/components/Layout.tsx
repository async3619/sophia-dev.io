import React, { useEffect } from 'react'
import { Global } from '@emotion/react'

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
    const pluginKey = process.env.NEXT_PUBLIC_CHANNEL_IO_PLUGIN_KEY
    if (!pluginKey) {
      return
    }

    ChannelService.loadScript()
    ChannelService.boot({ pluginKey })

    if (mode === 'dark') {
      ChannelService.setAppearance('dark')
    } else {
      ChannelService.setAppearance('light')
    }
  }, [mode])

  return (
    <Styled.Root>
      <CssBaseline />
      <Global styles={Styled.GlobalStyles} />
      <Container
        maxWidth="sm"
        sx={{
          '@media print': {
            maxWidth: 'none',
          },
        }}
      >
        <Header />
        <Styled.Main>{children}</Styled.Main>
        <Footer items={FOOTER_ITEMS} />
      </Container>
    </Styled.Root>
  )
}
