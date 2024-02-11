import { MovieReviewPostDocument } from '@constants/review'

import * as Styled from './MovieItem.styled'

export interface MovieItemProps {
  item: MovieReviewPostDocument
}

export function MovieReviewItem({ item }: MovieItemProps) {
  return <Styled.Root></Styled.Root>
}
