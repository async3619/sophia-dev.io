import { css } from '@emotion/react'

import { InterpolationArgs } from '.'

export const linkInterpolation = ({ theme }: InterpolationArgs) => css`
  text-decoration-style: dotted;
  color: ${theme.vars.palette.primary.main};
`
