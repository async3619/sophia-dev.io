import styled from '@emotion/styled'

export const Root = styled.div`
  width: 100%;

  opacity: 0;
  transform: translateY(-100%) translateY(-50%);

  text-align: center;

  transition: ${({ theme }) =>
    theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.standard,
    })};
`
