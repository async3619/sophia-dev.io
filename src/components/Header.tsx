import * as Styled from './Header.styled'

import { ThemeButton } from '@components/ThemeButton'
import { LangSwitch } from '@components/LangSwitch'

export interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <Styled.Root>
      <LangSwitch />
      <ThemeButton />
    </Styled.Root>
  )
}
