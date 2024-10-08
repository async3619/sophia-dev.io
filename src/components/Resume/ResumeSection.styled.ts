import styled from '@emotion/styled'

export const Root = styled.section`
  word-break: keep-all;

  &:not(:last-of-type) {
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`
