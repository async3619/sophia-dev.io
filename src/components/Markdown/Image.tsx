import React from 'react'

import * as Styled from './Image.styled'

export function MarkdownImage(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) {
  return <Styled.Root {...props} />
}
