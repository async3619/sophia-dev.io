import styled from '@emotion/styled'
import Image from 'next/image'
import { linkInterpolation } from '@styles/link'

export const Root = styled.div`
  display: flex;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`

export const ProfileImage = styled(Image)`
  margin-right: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  display: block;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`

export const Link = styled.a`
  ${linkInterpolation}
`
