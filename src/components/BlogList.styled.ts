import Link from 'next/link'
import styled from '@emotion/styled'

export const Root = styled.div``

export const Item = styled(Link)`
  padding: ${({ theme }) => theme.spacing(1, 0)};
  border-radius: ${({ theme }) => theme.shape.borderRadius};

  display: block;
  text-decoration: none;
  color: inherit;

  transition: ${({ theme }) =>
    theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    })};

  &:hover {
    > h6 {
      text-decoration: underline;
    }
  }
`
