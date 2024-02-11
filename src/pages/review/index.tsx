import _ from 'lodash'
import dayjs from 'dayjs'

import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Title } from '@components/Title'

import { getDocuments, Blog } from '@utils/getDocuments'

interface ReviewsPage {
  blogs: Blog[]
}

export default function Reviews({ blogs }: ReviewsPage) {
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
  const documents = getDocuments('review', locale)

  return {
    props: {
      blogs: _.chain(documents)
        .orderBy(
          (document) =>
            dayjs(document.metadata.createdAt, 'YYYY-MM-DD HH:mm:ss').unix(),
          'desc',
        )
        .value(),
    },
  }
}
