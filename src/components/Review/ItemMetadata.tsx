import * as Styled from './ItemMetadata.styled'
import { Box, Rating, Typography } from '@mui/material'
import { useMemo } from 'react'
import dayjs from 'dayjs'

export interface ItemMetadataProps {
  title: string
  rating: number
  createdAt: string
  author: string
}

export function ReviewItemMetadata({
  author,
  rating,
  title,
  createdAt,
}: ItemMetadataProps) {
  const writtenAt = useMemo(
    () => dayjs(createdAt, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
    [createdAt],
  )

  return (
    <>
      <Box display="flex" justifyContent="center" mt={1} mb={0.5}>
        <Rating
          size="small"
          defaultValue={rating / 2}
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
        {title}
      </Typography>
      <Typography
        variant="body2"
        fontSize="0.75rem"
        fontWeight={500}
        textAlign="center"
        color="text.secondary"
        fontStyle="italic"
      >
        {author}
      </Typography>
      <Typography
        variant="body2"
        fontSize="0.75rem"
        fontWeight={500}
        textAlign="center"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        {writtenAt}
      </Typography>
    </>
  )
}
