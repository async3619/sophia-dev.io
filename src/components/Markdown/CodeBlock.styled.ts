import styled from '@emotion/styled'

export const Root = styled.pre`
  margin: ${({ theme }) => theme.spacing(2, -4)};

  padding: ${({ theme }) => theme.spacing(2, 0, 2, 2)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  position: relative;

  overflow-x: auto;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: ${({ theme }) => theme.spacing(2, 0)};
  }
`
