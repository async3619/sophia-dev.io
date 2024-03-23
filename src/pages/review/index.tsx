import _ from 'lodash'
import dayjs from 'dayjs'

import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Title } from '@components/Title'

import {
  MOVIE_REVIEW_METADATA_VALIDATOR,
  MUSIC_REVIEW_METADATA_VALIDATOR,
  ReviewPostDocument,
} from '@constants/review'

import { getDocuments } from '@utils/getDocuments'
import { ReviewList } from '@components/Review/List'

interface ReviewsPage {
  reviews: ReviewPostDocument[]
}

export default function Reviews({ reviews }: ReviewsPage) {
  const { t } = useTranslation('review')

  return (
    <div>
      <Title>{t('title')}</Title>
      <ReviewList items={reviews} emptyText={t('empty')} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<ReviewsPage> = async ({
  locale,
}) => {
  const musicReviews = getDocuments(
    'review/albums',
    MUSIC_REVIEW_METADATA_VALIDATOR,
    locale,
  )

  const movieReviews = getDocuments(
    'review/movies',
    MOVIE_REVIEW_METADATA_VALIDATOR,
    locale,
  )

  return {
    props: {
      reviews: _.chain([...musicReviews, ...movieReviews])
        .orderBy(
          (document) =>
            dayjs(document.metadata.createdAt, 'YYYY-MM-DD HH:mm:ss').unix(),
          'desc',
        )
        .value(),
    },
  }
}
