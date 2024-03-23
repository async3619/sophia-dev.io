import * as Styled from './ItemMetadata.styled'
import { Box, Rating, Typography } from '@mui/material'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import useTranslation from 'next-translate/useTranslation'

export interface ItemMetadataProps {
  type: 'movie' | 'album'
  title: string
  rating: number
  createdAt: string
  author: string
}

export function ReviewItemMetadata({
  type,
  author,
  rating,
  title,
  createdAt,
}: ItemMetadataProps) {
  const { t } = useTranslation('review')
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
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 0.5 }}
      >
        {writtenAt}
        <Box
          component="span"
          width={8}
          height="2px"
          mx={0.5}
          display="inline-block"
          sx={{
            backgroundColor: (theme) => theme.palette.divider,
          }}
        />
        {t(`${type}`)}
      </Typography>
    </>
  )
}
