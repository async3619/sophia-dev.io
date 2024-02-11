import { useMemo } from 'react'
import dayjs from 'dayjs'

import { Box, Rating, Typography } from '@mui/material'

import { MusicReviewPostDocument } from '@constants/review'

import * as Styled from './MusicItem.styled'

export interface MusicItemProps {
  item: MusicReviewPostDocument
}

export function MusicReviewItem({ item }: MusicItemProps) {
  const createdAt = useMemo(
    () =>
      dayjs(item.metadata.createdAt, 'YYYY-MM-DD HH:mm:ss').format(
        'YYYY-MM-DD',
      ),
    [item.metadata.createdAt],
  )

  return (
    <Styled.Root href="/review/[slug]" as={`/review/${item.slug}`}>
      <Styled.Graphics>
        <Styled.Art
          style={{ backgroundImage: `url(${item.metadata.coverImage})` }}
        />
        <Styled.Background />
        <Styled.DiscWrapper>
          <Styled.Disc
            style={{ backgroundImage: `url(${item.metadata.coverImage})` }}
          >
            <Styled.Circle />
          </Styled.Disc>
        </Styled.DiscWrapper>
        <Styled.Open />
      </Styled.Graphics>
      <Box display="flex" justifyContent="center" mb={0.5}>
        <Rating
          size="small"
          defaultValue={item.metadata.rating / 2}
          precision={0.5}
          readOnly
        />
      </Box>
      <Typography
        component={Styled.Title}
        variant="body1"
        fontSize="0.875rem"
        fontWeight={500}
        textAlign="center"
      >
        {item.metadata.title}
      </Typography>
      <Typography
        variant="body2"
        fontSize="0.75rem"
        fontWeight={500}
        textAlign="center"
        color="text.secondary"
        fontStyle="italic"
      >
        {item.metadata.artists[0]}
      </Typography>
      <Typography
        variant="body2"
        fontSize="0.75rem"
        fontWeight={500}
        textAlign="center"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        {createdAt}
      </Typography>
    </Styled.Root>
  )
}
