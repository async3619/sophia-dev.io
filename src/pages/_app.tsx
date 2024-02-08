import React from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useRemoteRefresh } from 'next-remote-refresh/hook'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { Layout } from '@components/Layout'

import { theme } from '@styles/theme'
import useTranslation from 'next-translate/useTranslation'
import { getWebsiteBaseUrl } from '@utils/getWebsiteBaseUrl'

export default function App({ Component, pageProps }: AppProps) {
  useRemoteRefresh({ shouldRefresh: () => true })

  const { asPath, locale } = useRouter()
  const canonical = `https://sophia-dev.io${asPath}`
  const { t } = useTranslation('common')

  return (
    <CssVarsProvider theme={theme}>
      <Head>
        <meta name="author" content="Sophia (me@sophia-dev.io)" />
        <link rel="canonical" href={canonical} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta name="twitter:card" content="photo" />
        <meta name="twitter:url" content={canonical} />
        <meta name="twitter:title" content={t('title')} />
        <meta name="twitter:description" content={t('description')} />
        <meta
          name="twitter:image"
          content={`${getWebsiteBaseUrl(true)}/api/index-card?locale=${locale}`}
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </Layout>
    </CssVarsProvider>
  )
}
