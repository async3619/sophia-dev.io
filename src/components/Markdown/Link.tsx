import React from 'react'

import * as Styled from './Link.styled'

export function MarkdownLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const { href } = props
  if (href && href.startsWith('/')) {
    return <Styled.LinkRoot {...props} href={href} />
  }

  return <Styled.Root {...props} />
}
