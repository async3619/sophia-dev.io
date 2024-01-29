import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRemoteRefresh } from 'next-remote-refresh/hook'

import * as ChannelService from '@channel.io/channel-web-sdk-loader'

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { Layout } from '@components/Layout'

import { theme } from '@styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  useRemoteRefresh({ shouldRefresh: () => true })

  useEffect(() => {
    ChannelService.loadScript()
    ChannelService.boot({ pluginKey: 'eb4b2c86-9a99-4081-8c2d-9897be690491' })
  }, [])

  return (
    <CssVarsProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CssVarsProvider>
  )
}
