import React from 'react'
import _ from 'lodash'
import dayjs from 'dayjs'

import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { Title } from '@components/Title'
import { BlogList } from '@components/BlogList'
import { SimpleBlogList } from '@components/SimpleBlogList'

import { BLOG_POST_METADATA_VALIDATOR, BlogPostDocument } from '@constants/blog'

import { getDocuments } from '@utils/getDocuments'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

interface BlogsPage {
  blogs: BlogPostDocument[]
}

export default function Blogs({ blogs }: BlogsPage) {
  const { t } = useTranslation('blog')
  const [detailed, setDetailed] = React.useState(false)

  const handleDetailedChange = React.useCallback(
    (_: unknown, checked: boolean) => {
      setDetailed(checked)
    },
    [],
  )

  return (
    <div>
      <Box
        mb="1.3125rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Title withoutMargin>{t('title')}</Title>
        <FormControlLabel
          control={<Checkbox onChange={handleDetailedChange} size="small" />}
          label={t('detailed')}
          sx={{ mr: 0 }}
          componentsProps={{
            typography: {
              variant: 'body2',
              color: 'text.secondary',
              sx: {
                userSelect: 'none',
              },
            },
          }}
        />
      </Box>
      {blogs.length === 0 ? (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {t('empty')}
        </Typography>
      ) : detailed ? (
        <BlogList blogs={blogs} />
      ) : (
        <SimpleBlogList blogs={blogs} />
      )}
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
