import styled from '@emotion/styled'

export const Root = styled.div`
  opacity: 0;
  transform: translateY(-100%) translateY(-50%);

  transition: ${({ theme }) =>
    theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.standard,
    })};
`
