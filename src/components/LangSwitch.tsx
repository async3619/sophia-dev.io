import Link from 'next/link'
import { useRouter } from 'next/router'

import { AVAILABLE_LANGUAGES } from '@constants/lang'

import * as Styled from './LangSwitch.styled'
import { Typography } from '@mui/material'

export interface LangSwitchProps {}

export function LangSwitch({}: LangSwitchProps) {
  const { locale, asPath } = useRouter()

  return (
    <Styled.Root>
      {AVAILABLE_LANGUAGES.map((lang) => {
        if (locale === lang) {
          return (
            <Typography variant="body1" fontWeight={800} key={lang}>
              {lang}
            </Typography>
          )
        }

        return (
          <Link key={lang} href={asPath} locale={lang}>
            {lang}
          </Link>
        )
      })}
    </Styled.Root>
  )
}
