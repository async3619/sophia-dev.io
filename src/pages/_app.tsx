import React from 'react'
import type { AppProps } from 'next/app'
import { useRemoteRefresh } from 'next-remote-refresh/hook'

import { Analytics } from '@vercel/analytics/react'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { Layout } from '@components/Layout'

import { theme } from '@styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  useRemoteRefresh({ shouldRefresh: () => true })

  return (
    <CssVarsProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </CssVarsProvider>
  )
}
