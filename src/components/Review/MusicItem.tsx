import { ReviewItemMetadata } from '@components/Review/ItemMetadata'

import { MusicReviewPostDocument } from '@constants/review'

import * as Styled from './MusicItem.styled'

export interface MusicItemProps {
  item: MusicReviewPostDocument
}

export function MusicReviewItem({ item }: MusicItemProps) {
  const { title, rating, createdAt, artists, coverImage } = item.metadata

  return (
    <Styled.Root
      href="/review/albums/[slug]"
      as={`/review/albums/${item.slug}`}
    >
      <Styled.Graphics>
        <Styled.Art style={{ backgroundImage: `url(${coverImage})` }} />
        <Styled.Background />
        <Styled.DiscWrapper>
          <Styled.Disc style={{ backgroundImage: `url(${coverImage})` }}>
            <Styled.Circle />
          </Styled.Disc>
        </Styled.DiscWrapper>
        <Styled.Open />
      </Styled.Graphics>
      <ReviewItemMetadata
        type="album"
        title={title}
        rating={rating}
        createdAt={createdAt}
        author={artists.join(', ')}
      />
    </Styled.Root>
  )
}
