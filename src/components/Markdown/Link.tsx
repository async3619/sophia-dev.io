import React from 'react'

import * as Styled from './Link.styled'

export function MarkdownLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  return <Styled.Root {...props} />
}
