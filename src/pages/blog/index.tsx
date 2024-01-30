import _ from 'lodash'
import dayjs from 'dayjs'

import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Title } from '@components/Title'
import { BlogList } from '@components/BlogList'

import { getDocuments, Blog } from '@utils/getDocuments'

interface BlogsPage {
  blogs: Blog[]
}

export default function Blogs({ blogs }: BlogsPage) {
  const { t } = useTranslation('blog')

  return (
    <div>
      <Title>{t('title')}</Title>
      <BlogList blogs={blogs} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<BlogsPage> = async ({ locale }) => {
  const documents = getDocuments('blog', locale)

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
