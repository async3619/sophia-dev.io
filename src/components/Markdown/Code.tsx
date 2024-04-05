import React from 'react'

import * as Styled from './Code.styled'

export function MarkdownCode(props: React.HTMLAttributes<HTMLPreElement>) {
  if ('data-language' in props) {
    return <Styled.CodeBlockContent {...props} />
  }

  return <Styled.Root {...props} />
}
