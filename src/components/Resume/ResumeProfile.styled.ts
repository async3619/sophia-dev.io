import styled from '@emotion/styled'
import Image from 'next/image'
import { linkInterpolation } from '@styles/link'

export const Root = styled.div`
  display: flex;
`

export const ProfileImage = styled(Image)`
  margin-right: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  display: block;
`

export const Link = styled.a`
  ${linkInterpolation}
`
