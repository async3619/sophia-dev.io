import * as Styled from './Header.styled'

import { ThemeButton } from '@components/ThemeButton'

export interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <Styled.Root>
      <ThemeButton />
    </Styled.Root>
  )
}
