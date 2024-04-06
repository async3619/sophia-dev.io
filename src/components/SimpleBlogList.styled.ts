import Link from 'next/link'

import styled from '@emotion/styled'

export const Root = styled.div``

export const Blog = styled.div`
  display: flex;
  align-items: center;

  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

export const Title = styled(Link)`
  min-width: 0;
  margin: 0 ${({ theme }) => theme.spacing(1)} 0 0;

  display: block;

  color: ${({ theme }) => theme.vars.palette.text.primary};
  text-decoration: none;

  > span {
    width: 100%;

    display: block;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover,
  &:focus-visible {
    text-decoration: underline;
    text-decoration-style: dotted;
  }
`

export const Date = styled.time`
  margin: 0;

  flex: 0 0 auto;

  color: ${({ theme }) => theme.vars.palette.text.secondary};
`
