import Link from 'next/link'
import styled from '@emotion/styled'
import { linkInterpolation } from '@styles/link'

export const DiscWrapper = styled.div``

export const Art = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  position: relative;
  z-index: 10;

  aspect-ratio: 1 / 1;

  clip-path: polygon(0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%);
  box-shadow: 0 2px 4px black;
`

export const Disc = styled.div`
  border-radius: 100%;

  width: 85%;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 3px solid whitesmoke;

  box-sizing: content-box;

  position: absolute;
  top: 7.5%;
  left: 7.5%;

  box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.15);

  aspect-ratio: 1 / 1;
  transform-origin: center center;
  transition: ${({ theme }) =>
    theme.transitions.create(['transform'], { duration: 450 })};

  transform: translate3d(0, 0, 0) rotate(45deg);
`

export const Circle = styled.div`
  width: 24px;
  height: 24px;

  margin: 0;
  padding: 0;
  border-radius: 100%;

  position: absolute;
  top: 50%;
  left: 50%;

  background: #cfb798;

  transform: translate(-50%, -50%);

  box-shadow: inset 0 0 4px 1px rgba(0, 0, 0, 0.25);
`

export const Background = styled.div``

export const Open = styled.div``

export const Graphics = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};

  position: relative;

  background-color: #cfb798;

  box-shadow: ${({ theme }) => theme.shadows[0]};
  transition: ${({ theme }) =>
    theme.transitions.create(['box-shadow'], { duration: 450 })};

  transform: translate3d(0, 0, 0);
`

export const Title = styled.p`
  text-decoration: underline;

  ${linkInterpolation}
`

export const Root = styled(Link)`
  display: block;
  text-decoration: none;

  &:hover {
    ${Disc} {
      transform: translate3d(0, 0, 0) translateX(24px) rotate(90deg);
    }

    ${Graphics} {
      box-shadow: ${({ theme }) => theme.shadows[8]};
    }
  }
`
