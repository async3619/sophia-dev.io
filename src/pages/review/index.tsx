import _ from 'lodash'
import dayjs from 'dayjs'

import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Title } from '@components/Title'

import {
  REVIEW_POST_METADATA_VALIDATOR,
  ReviewPostDocument,
} from '@constants/review'

import { getDocuments } from '@utils/getDocuments'

interface ReviewsPage {
  reviews: ReviewPostDocument[]
}

export default function Reviews({ reviews }: ReviewsPage) {
  const { t } = useTranslation('review')

  return (
    <div>
      <Title>{t('title')}</Title>
    </div>
  )
}

export const getStaticProps: GetStaticProps<ReviewsPage> = async ({
  locale,
}) => {
  const documents = getDocuments(
    'review',
    REVIEW_POST_METADATA_VALIDATOR,
    locale,
  )

  return {
    props: {
      reviews: _.chain(documents)
        .orderBy(
          (document) =>
            dayjs(document.metadata.createdAt, 'YYYY-MM-DD HH:mm:ss').unix(),
          'desc',
        )
        .value(),
    },
  }
}
