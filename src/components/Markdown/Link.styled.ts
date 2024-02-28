import Link from 'next/link'

import styled from '@emotion/styled'

import { linkInterpolation } from '@styles/link'

export const Root = styled.a`
  ${linkInterpolation}
`

export const LinkRoot = styled(Link)`
  ${linkInterpolation}
`
