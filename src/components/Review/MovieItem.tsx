import { MovieReviewPostDocument } from '@constants/review'

import * as Styled from './MovieItem.styled'
import { ReviewItemMetadata } from '@components/Review/ItemMetadata'
import { useMemo } from 'react'
import dayjs from 'dayjs'

export interface MovieItemProps {
  item: MovieReviewPostDocument
}

export function MovieReviewItem({ item }: MovieItemProps) {
  const { title, rating, releasedAt, createdAt, directors } = item.metadata
  const releasedYear = useMemo(
    () => dayjs(releasedAt, 'YYYY-MM-DD').format('YYYY'),
    [releasedAt],
  )

  return (
    <Styled.Root
      href="/review/movies/[slug]"
      as={`/review/movies/${item.slug}`}
    >
      <Styled.Graphics>
        <Styled.Poster src={item.metadata.coverImage} />
      </Styled.Graphics>
      <ReviewItemMetadata
        title={`${title} (${releasedYear})`}
        rating={rating}
        createdAt={createdAt}
        author={directors.join(', ')}
      />
    </Styled.Root>
  )
}
