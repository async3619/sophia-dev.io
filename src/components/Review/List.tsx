import React from 'react'

import { Grid, Typography } from '@mui/material'

import {
  isMovieReviewDocument,
  isMusicReviewDocument,
  ReviewPostDocument,
} from '@constants/review'
import { MovieReviewItem } from '@components/Review/MovieItem'
import { MusicReviewItem } from '@components/Review/MusicItem'

import * as Styled from './List.styled'

export interface ReviewListProps {
  items: ReviewPostDocument[]
  emptyText: string
}

export function ReviewList({ items, emptyText }: ReviewListProps) {
  if (items.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {emptyText ?? 'No reviews found.'}
      </Typography>
    )
  }

  return (
    <Styled.Root>
      <Grid container spacing={2}>
        {items.map((item) => {
          let node: React.ReactNode
          if (isMovieReviewDocument(item)) {
            node = <MovieReviewItem item={item} />
          } else if (isMusicReviewDocument(item)) {
            node = <MusicReviewItem item={item} />
          } else {
            throw new Error(`Unknown review type: ${item.metadata.type}`)
          }

          return (
            <Grid item key={item.slug} xs={6} sm={4}>
              {node}
            </Grid>
          )
        })}
      </Grid>
    </Styled.Root>
  )
}
