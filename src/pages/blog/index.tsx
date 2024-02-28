import _ from 'lodash'
import dayjs from 'dayjs'

import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Title } from '@components/Title'
import { BlogList } from '@components/BlogList'

import { BLOG_POST_METADATA_VALIDATOR, BlogPostDocument } from '@constants/blog'

import { getDocuments } from '@utils/getDocuments'

interface BlogsPage {
  blogs: BlogPostDocument[]
}

export default function Blogs({ blogs }: BlogsPage) {
  const { t } = useTranslation('blog')

  return (
    <div>
      <Title>{t('title')}</Title>
      <BlogList blogs={blogs} emptyText={t('empty')} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<BlogsPage> = async ({ locale }) => {
  const documents = getDocuments('blog', BLOG_POST_METADATA_VALIDATOR, locale)

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
