import { Blog } from '@utils/getDocuments'

import * as Styled from './BlogList.styled'
import dayjs from 'dayjs'
import { Stack, Typography } from '@mui/material'

export interface BlogListProps {
  blogs: Blog[]
  emptyText?: string
}

export function BlogList({ blogs, emptyText }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {emptyText ?? 'No blogs found.'}
      </Typography>
    )
  }

  return (
    <Styled.Root>
      <Stack spacing={1}>
        {blogs.map((blog) => {
          const { title, excerpt, createdAt } = blog.metadata
          const formattedDate = dayjs(createdAt).format('YYYY-MM-DD')

          return (
            <Styled.Item
              key={blog.slug}
              href="/blog/[slug]"
              as={`/blog/${blog.slug}`}
            >
              <Typography variant="h6">{title}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ my: 0.5 }}
              >
                {formattedDate}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                {excerpt}
              </Typography>
            </Styled.Item>
          )
        })}
      </Stack>
    </Styled.Root>
  )
}
