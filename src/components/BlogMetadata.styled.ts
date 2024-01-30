import styled from '@emotion/styled'

export const Separator = styled.div`
  width: 2px;
  height: 2px;

  border-radius: 50%;

  background-color: ${({ theme }) => theme.vars.palette.divider};
`
