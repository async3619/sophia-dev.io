import styled from '@emotion/styled'
import { linkInterpolation } from '@styles/link'

export const Root = styled.div``

export const Link = styled.a`
  ${linkInterpolation};

  color: ${({ theme }) => theme.palette.text.primary};

  > span {
    text-decoration: underline;
  }
`

export const List = styled.ul`
  margin: 0;
  padding: ${({ theme }) => theme.spacing(1, 0, 0, 2)};
`

export const ChipList = styled.div`
  padding-left: ${({ theme }) => theme.spacing(2)};

  display: flex;
  flex-wrap: wrap;

  gap: ${({ theme }) => theme.spacing(1)};
`

export const Chip = styled.div`
  padding: ${({ theme }) => theme.spacing(0.5, 1)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  ${({ theme }) => theme.getColorSchemeSelector('dark')} {
    background-color: rgba(255, 255, 255, 0.05);
  }

  ${({ theme }) => theme.getColorSchemeSelector('light')} {
    background-color: rgba(0, 0, 0, 0.05);
  }
`
