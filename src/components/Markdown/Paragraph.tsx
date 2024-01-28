import React from 'react'

import * as Styled from './Paragraph.styled'

export function MarkdownParagraph(
  props: React.HTMLAttributes<HTMLParagraphElement>,
) {
  return <Styled.Root {...props} />
}
