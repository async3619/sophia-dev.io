import React from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

import { Box, Typography } from '@mui/material'

import { ReviewTrackList } from '@components/Review/TrackList'
import { AlbumInformation } from '@components/Review/AlbumInformation'
import { ReviewPageBase } from '@components/Review/PageBase'

import {
  MUSIC_REVIEW_METADATA_VALIDATOR,
  MusicReviewPostDocument,
  REVIEW_POST_METADATA_VALIDATOR,
} from '@constants/review'

import { getDocument, StaticBaseProps } from '@utils/getDocument'
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
  const { t } = useTranslation('review')
  const { locale } = useRouter()

  if (!locale) {
    return null
  }

  const title = `[${metadata.title}] ${t('title')}`

  return (
    <ReviewPageBase
      source={source}
      cardUrl={cardUrl}
      title={title}
      readingTime={readingTime.minutes}
      metadata={metadata}
    >
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
    </ReviewPageBase>
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
    'review/albums',
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
      'review/albums',
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
