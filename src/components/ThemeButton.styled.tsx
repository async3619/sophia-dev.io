import styled from '@emotion/styled'
import { IconButton } from '@mui/material'

export const Button = styled(IconButton)`
  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;
  border: 1px solid;

  ${({ theme }) => theme.getColorSchemeSelector('dark')} {
    border-color: rgba(80, 80, 80, 1);
  }

  ${({ theme }) => theme.getColorSchemeSelector('light')} {
    border-color: ${({ theme }) => theme.palette.divider};
  }
`
