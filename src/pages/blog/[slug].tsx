import React from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

import { Box } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import Giscus from '@giscus/react'

import { Title } from '@components/Title'
import { MDXRenderer } from '@components/MDXRenderer'
import { BlogMetadata } from '@components/BlogMetadata'

import { useFormattedDate } from '@hooks/useFormattedDate'

import { BLOG_POST_METADATA_VALIDATOR, BlogPostMetadata } from '@constants/blog'

import { getDocuments } from '@utils/getDocuments'
import { getDocument, StaticBaseProps } from '@utils/getDocument'
import { isValidString } from '@utils/isValidString'
import { getWebsiteBaseUrl } from '@utils/getWebsiteBaseUrl'

interface PostPage extends StaticBaseProps<BlogPostMetadata> {
  cardUrl: string
}

export default function Post({
  source,
  metadata,
  readingTime,
  cardUrl,
}: PostPage) {
  const { mode } = useColorScheme()
  const { t } = useTranslation('blog')
  const { locale } = useRouter()
  const formattedDate = useFormattedDate(metadata.createdAt)

  if (!locale) {
    return null
  }

  return (
    <div>
      <Head>
        <meta name="og:image" content={cardUrl} />
        <meta
          name="og:description"
          content={metadata.excerpt || metadata.title}
        />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.excerpt} />
        <meta name="twitter:image" content={cardUrl} />
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
          theme={`${getWebsiteBaseUrl(true)}/giscus-${mode}.css`}
          lang={locale}
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

  const document = await getDocument(
    'blog',
    slug,
    BLOG_POST_METADATA_VALIDATOR,
    locale,
  )

  const { excerpt, title } = document.metadata

  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(excerpt)
  const openGraphImageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/blog-card?title=${encodedTitle}&description=${encodedDescription}&locale=${locale}`

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
    const documents = getDocuments('blog', BLOG_POST_METADATA_VALIDATOR, locale)
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
