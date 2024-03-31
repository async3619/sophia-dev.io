import React from 'react'

import { Tooltip } from '@mui/material'

import * as Styled from './HeaderIconButton.styled'

export interface HeaderIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip: string
}

export const HeaderIconButton = React.forwardRef<
  HTMLButtonElement,
  HeaderIconButtonProps
>(({ tooltip, onClick, children }, ref) => (
  <Tooltip title={tooltip}>
    <Styled.Root ref={ref} onClick={onClick} size="small">
      {children}
    </Styled.Root>
  </Tooltip>
))

HeaderIconButton.displayName = 'HeaderIconButton'
