import dayjs from 'dayjs'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'

import { Box } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import Giscus from '@giscus/react'

import { Title } from '@components/Title'
import { MDXRenderer } from '@components/MDXRenderer'

import { getDocuments, Metadata } from '@utils/getDocuments'
import { getDocument, StaticBaseProps } from '@utils/getDocument'
import { isValidString } from '@utils/isValidString'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { BlogMetadata } from '@components/BlogMetadata'

interface PostPage extends StaticBaseProps<Metadata> {}

export default function Post({ source, metadata, readingTime }: PostPage) {
  const { mode } = useColorScheme()
  const { t } = useTranslation('blog')
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

  return (
    <div>
      <Head>
        <meta
          name="og:description"
          content={metadata.excerpt || metadata.title}
        />
      </Head>
      <Title withoutMargin>{metadata.title}</Title>
      <Box mt={1} mb="1.3125rem">
        <BlogMetadata
          tokens={[
            formattedDate,
            t('readingTime', { count: Math.ceil(readingTime.minutes) }),
          ]}
        />
      </Box>
      <MDXRenderer source={source} />
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
          theme={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/giscus-theme/${mode}`}
          lang="ko"
        />
      </Box>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PostPage> = async ({
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

  const document = await getDocument<Metadata>('blog', slug, locale)

  return {
    props: { ...document },
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (!locales) {
    return { paths: [], fallback: false }
  }

  const results: { params: { slug: string }; locale: string }[] = []
  for (const locale of locales) {
    const documents = getDocuments('blog', locale)
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
