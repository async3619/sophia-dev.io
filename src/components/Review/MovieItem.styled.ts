import Link from 'next/link'
import styled from '@emotion/styled'

export const Graphics = styled.div`
  aspect-ratio: 1 / 1;

  display: flex;
  justify-content: center;
`

export const Poster = styled.img`
  height: 100%;

  display: block;

  object-fit: contain;

  box-shadow: ${({ theme }) => theme.shadows[0]};
  transition: ${({ theme }) =>
    theme.transitions.create(['box-shadow'], { duration: 450 })};
`

export const Root = styled(Link)`
  display: block;
  text-decoration: none;

  &:hover {
    ${Poster} {
      box-shadow: ${({ theme }) => theme.shadows[8]};
    }
  }
`
