import { useMemo } from 'react'

import { BlogPostDocument } from '@constants/blog'

import * as Styled from './SimpleBlogList.styled'
import _ from 'lodash'
import dayjs from 'dayjs'
import { Typography } from '@mui/material'

export interface SimpleBlogListProps {
  blogs: BlogPostDocument[]
}

export function SimpleBlogList({ blogs }: SimpleBlogListProps) {
  const sortedBlogs = useMemo(() => {
    return _.chain(blogs)
      .orderBy(
        (blog) => dayjs(blog.metadata.createdAt, 'YYYY-MM-DD HH:mm:ss').unix(),
        'desc',
      )
      .value()
  }, [blogs])

  return (
    <Styled.Root>
      {sortedBlogs.map((blog) => {
        const { title, createdAt } = blog.metadata
        const formattedDate = dayjs(createdAt).format('YYYY-MM-DD')
        const isoDate = dayjs(createdAt).toISOString()

        return (
          <Styled.Blog key={blog.slug}>
            <Styled.Title href="/blog/[slug]" as={`/blog/${blog.slug}`}>
              <Typography component="span" variant="body1">
                {title}
              </Typography>
            </Styled.Title>
            <Styled.Date dateTime={isoDate}>
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {formattedDate}
              </Typography>
            </Styled.Date>
          </Styled.Blog>
        )
      })}
    </Styled.Root>
  )
}
