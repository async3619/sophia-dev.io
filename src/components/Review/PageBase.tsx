import React from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

import { Box, Rating, Typography } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'

import Giscus from '@giscus/react'

import { Title } from '@components/Title'
import { MDXRenderer } from '@components/MDXRenderer'
import { BlogMetadata } from '@components/BlogMetadata'

import { useFormattedDate } from '@hooks/useFormattedDate'

import { BaseReviewPostMetadata } from '@constants/review'

import { getWebsiteBaseUrl } from '@utils/getWebsiteBaseUrl'

export interface ReviewPageBaseProps {
  cardUrl: string
  title: string
  children?: React.ReactNode
  source: MDXRemoteSerializeResult
  readingTime: number
  metadata: BaseReviewPostMetadata
  coverImageAspectRatio?: number
}

export function ReviewPageBase({
  cardUrl,
  title,
  children,
  source,
  readingTime,
  metadata,
  coverImageAspectRatio = 1,
}: ReviewPageBaseProps) {
  const { t } = useTranslation('review')
  const { mode } = useColorScheme()
  const { locale } = useRouter()
  const formattedDate = useFormattedDate(metadata.createdAt)

  return (
    <div>
      <Head>
        <meta name="og:image" content={cardUrl} />
        <meta name="og:description" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={cardUrl} />
      </Head>
      <Title withoutMargin>{title}</Title>
      <Box mt={1} mb="1.3125rem">
        <BlogMetadata
          tokens={[
            formattedDate,
            t('readingTime', { count: Math.ceil(readingTime) }),
          ]}
        />
      </Box>
      <Box display="flex" mb={2} justifyContent="center">
        <Image
          src={metadata.coverImage}
          width={250}
          height={250 * coverImageAspectRatio}
          alt={metadata.title}
        />
      </Box>
      <Box display="flex" mb={2} justifyContent="center">
        <Rating defaultValue={metadata.rating / 2} precision={0.5} readOnly />
      </Box>
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
