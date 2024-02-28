import dayjs from 'dayjs'
import React, { useMemo } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Giscus from '@giscus/react'
import { Box, Rating, Typography } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'

import { Title } from '@components/Title'
import { BlogMetadata } from '@components/BlogMetadata'
import { MDXRenderer } from '@components/MDXRenderer'

import { ReviewTrackList } from '@components/Review/TrackList'
import { AlbumInformation } from '@components/Review/AlbumInformation'

import {
  MUSIC_REVIEW_METADATA_VALIDATOR,
  MusicReviewPostDocument,
  REVIEW_POST_METADATA_VALIDATOR,
} from '@constants/review'

import { getDocument, StaticBaseProps } from '@utils/getDocument'
import { getWebsiteBaseUrl } from '@utils/getWebsiteBaseUrl'
import { isValidString } from '@utils/isValidString'
import { getDocuments } from '@utils/getDocuments'

interface ReviewPageProps
  extends StaticBaseProps<MusicReviewPostDocument['metadata']> {
  cardUrl: string
}

export default function Review({
  source,
  metadata,
  readingTime,
  cardUrl,
}: ReviewPageProps) {
  const { mode } = useColorScheme()
  const { t } = useTranslation('review')
  const { locale } = useRouter()
  const formattedDate = useMemo(() => {
    if (!locale) {
      throw new Error('locale is not defined')
    }

    const date = dayjs(metadata.createdAt, 'YYYY-MM-DD HH:mm:ss').toDate()
    return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date)
  }, [metadata.createdAt, locale])

  if (!locale) {
    return null
  }

  const title = `[${metadata.title}] ${t('title')}`

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
            t('readingTime', { count: Math.ceil(readingTime.minutes) }),
          ]}
        />
      </Box>
      <Box display="flex" mb={2} justifyContent="center">
        <Image src={metadata.coverImage} width={250} height={250} alt="" />
      </Box>
      <Box display="flex" mb={2} justifyContent="center">
        <Rating defaultValue={metadata.rating / 2} precision={0.5} readOnly />
      </Box>
      <AlbumInformation metadata={metadata} />
      <Box component="section">
        <Typography
          variant="h4"
          fontSize="1.25rem"
          fontWeight={700}
          lineHeight={1.6}
          sx={{ mb: '0.75em' }}
        >
          수록곡 📙
        </Typography>
        <ReviewTrackList tracks={metadata.tracks} />
      </Box>
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

export const getStaticProps: GetStaticProps<ReviewPageProps> = async ({
  params,
  locale,
}) => {
  if (!params) {
    return { notFound: true }
  }

  const { slug } = params
  if (!isValidString(slug)) {
    return { notFound: true }
  }

  const document = await getDocument(
    'review',
    slug,
    MUSIC_REVIEW_METADATA_VALIDATOR,
    locale,
  )

  const { title, quote } = document.metadata

  const encodedTitle = encodeURIComponent(title)
  const encodedQuote = encodeURIComponent(quote)
  const openGraphImageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/review-card?title=${encodedTitle}&description=${encodedQuote}&locale=${locale}&slug=${slug}`

  return {
    props: { ...document, cardUrl: openGraphImageUrl },
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (!locales) {
    return { paths: [], fallback: false }
  }

  const results: { params: { slug: string }; locale: string }[] = []
  for (const locale of locales) {
    const documents = getDocuments(
      'review',
      REVIEW_POST_METADATA_VALIDATOR,
      locale,
    )

    const paths = documents.map((document) => ({
      params: { slug: document.slug },
      locale,
    }))

    results.push(...paths)
  }

  return {
    paths: results,
    fallback: false,
  }
}
