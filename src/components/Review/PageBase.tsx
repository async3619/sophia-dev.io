import Head from 'next/head'
import React from 'react'

import { Box, Typography } from '@mui/material'

import Giscus from '@giscus/react'

import { Title } from '@components/Title'

import { getWebsiteBaseUrl } from '@utils/getWebsiteBaseUrl'
import { useColorScheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { MDXRenderer } from '@components/MDXRenderer'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface ReviewPageBaseProps {
  cardUrl: string
  title: string
  children?: React.ReactNode
  source: MDXRemoteSerializeResult
}

export function ReviewPageBase({
  cardUrl,
  title,
  children,
  source,
}: ReviewPageBaseProps) {
  const { mode } = useColorScheme()
  const { locale } = useRouter()

  return (
    <div>
      <Head>
        <meta name="og:image" content={cardUrl} />
        <meta name="og:description" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={cardUrl} />
      </Head>
      <Title withoutMargin>{title}</Title>
      {children}
      <Box component="section">
        <Typography
          variant="h4"
          fontSize="1.25rem"
          fontWeight={700}
          lineHeight={1.6}
          sx={{ mb: '0.75em' }}
        >
          감상평 💬
        </Typography>
        <MDXRenderer source={source} />
      </Box>
      <Box mt={8}>
        <Giscus
          id="comments"
          repo="async3619/sophia-dev.io"
          repoId="R_kgDOLKrNrA"
          category="General"
          categoryId="DIC_kwDOLKrNrM4CdEVh"
          mapping="title"
          strict="0"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="top"
          theme={`${getWebsiteBaseUrl(true)}/giscus-${mode}.css`}
          lang={locale}
        />
      </Box>
    </div>
  )
}
