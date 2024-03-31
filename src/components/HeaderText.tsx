import React, { useMemo } from 'react'
import { Transition } from 'react-transition-group'

import * as Styled from './HeaderText.styled'
import { useTheme } from '@mui/material'

export interface HeaderTextProps {
  enter: boolean
  children: React.ReactNode
}

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateY(100%) translateY(-50%)' },
  entered: { opacity: 1, transform: 'translateY(0) translateY(-50%)' },
  exiting: { opacity: 1, transform: 'translateY(0) translateY(-50%)' },
  exited: { opacity: 0, transform: 'translateY(-100%) translateY(-50%)' },
  unmounted: { transform: 'translateY(100%) translateY(-50%)' },
}

export function HeaderText({ enter, children }: HeaderTextProps) {
  const theme = useTheme()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const timeout = useMemo(() => theme.transitions.duration.standard, [theme])

  return (
    <Transition nodeRef={rootRef} in={enter} timeout={timeout}>
      {(state) => (
        <Styled.Root ref={rootRef} style={{ ...transitionStyles[state] }}>
          {children}
        </Styled.Root>
      )}
    </Transition>
  )
}
