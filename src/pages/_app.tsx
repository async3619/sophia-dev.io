import React from 'react'
import type { AppProps } from 'next/app'

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { Layout } from '@components/Layout'

import { theme } from '@styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CssVarsProvider>
  )
}
