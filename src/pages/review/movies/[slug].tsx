import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  XAxis,
  Area,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
} from 'recharts'

import { GetStaticPaths, GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

import { Box, Typography } from '@mui/material'

import { ReviewPageBase } from '@components/Review/PageBase'
import { MovieInformation } from '@components/Review/MovieInformation'

import {
  MOVIE_REVIEW_METADATA_VALIDATOR,
  MovieReviewPostDocument,
  REVIEW_POST_METADATA_VALIDATOR,
} from '@constants/review'

import { getDocument, StaticBaseProps } from '@utils/getDocument'
import { isValidString } from '@utils/isValidString'
import { getDocuments } from '@utils/getDocuments'

interface MovieReviewPageProps
  extends StaticBaseProps<MovieReviewPostDocument['metadata']> {
  cardUrl: string
}

export default function MovieReview({
  source,
  metadata,
  readingTime,
  cardUrl,
}: MovieReviewPageProps) {
  const { t } = useTranslation('review')
  const { locale } = useRouter()

  const ratingData = useMemo(() => {
    return metadata.ratings.map((rating, i) => ({
      name: (i + 1) / 2,
      Watcha: rating,
    }))
  }, [metadata])

  if (!locale) {
    return null
  }

  const year = dayjs(metadata.releasedAt, 'YYYY-MM-DD').format('YYYY')
  const title = `[${metadata.title} (${year})] ${t('title')}`

  return (
    <ReviewPageBase
      title={title}
      cardUrl={cardUrl}
      source={source}
      readingTime={readingTime.minutes}
      metadata={metadata}
      coverImageAspectRatio={metadata.posterHeight / metadata.posterWidth}
    >
      <MovieInformation metadata={metadata} />
      <Box component="section">
        <Typography
          variant="h4"
          fontSize="1.25rem"
          fontWeight={700}
          lineHeight={1.6}
          sx={{ mb: '0.75em' }}
        >
          영화 평점 📈
        </Typography>
        <Box sx={{ aspectRatio: '16 / 9' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={ratingData}
              margin={{
                top: 0,
                right: 16,
                left: 16,
                bottom: 16,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="Watcha"
                stroke="#ff0558"
                fill="#ff0558"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </ReviewPageBase>
  )
}

export const getStaticProps: GetStaticProps<MovieReviewPageProps> = async ({
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
    'review/movies',
    slug,
    MOVIE_REVIEW_METADATA_VALIDATOR,
    locale,
  )

  const { title, quote } = document.metadata

  const encodedTitle = encodeURIComponent(title)
  const encodedQuote = encodeURIComponent(quote)
  const openGraphImageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/movie-card?title=${encodedTitle}&description=${encodedQuote}&locale=${locale}&slug=${slug}`

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
      'review/movies',
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
