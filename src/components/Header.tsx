import { Stack } from '@mui/material'

import { ThemeButton } from '@components/ThemeButton'
import { LangSwitch } from '@components/LangSwitch'
import { Navigator } from '@components/Navigator'

import * as Styled from './Header.styled'

export interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <Styled.Root>
      <Navigator />
      <Stack spacing={1} direction="row" alignItems="center">
        <LangSwitch />
        <ThemeButton />
      </Stack>
    </Styled.Root>
  )
}
