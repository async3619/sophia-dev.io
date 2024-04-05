import styled from '@emotion/styled'

export const Root = styled.code`
  padding: ${({ theme }) => theme.spacing(0.125, 0.25)};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: 2px;

  font-size: 0.9em;
  font-family: 'Consolas', monospace;

  background-color: #eee;

  ${({ theme }) => theme.getColorSchemeSelector('dark')} {
    border-color: #343434;
    background-color: #343434;
  }
`
export const CodeBlockContent = styled.code`
  font-size: 0.9em;
  font-family: 'Consolas', monospace;

  [data-line] {
    padding-right: ${({ theme }) => theme.spacing(2)};
  }
`
