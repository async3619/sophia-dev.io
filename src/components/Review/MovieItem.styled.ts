import Link from 'next/link'
import styled from '@emotion/styled'

export const Root = styled(Link)`
  display: block;
  text-decoration: none;
`

export const Graphics = styled.div`
  aspect-ratio: 1 / 1;
`

export const Poster = styled.img`
  width: 100%;
  height: 100%;

  display: block;

  object-fit: contain;
`
