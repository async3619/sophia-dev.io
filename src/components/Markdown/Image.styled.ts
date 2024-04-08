import styled from '@emotion/styled'

export const Root = styled.img`
  width: calc(100% + ${({ theme }) => theme.spacing(8)});
  max-width: calc(100% + ${({ theme }) => theme.spacing(8)});

  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  margin: ${({ theme }) => theme.spacing(2, -4)};

  display: block;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    max-width: 100%;

    margin: ${({ theme }) => theme.spacing(2, 0)};
  }
`
