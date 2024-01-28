import ReactMarkdown from 'react-markdown'

import { MarkdownLink } from './Link'
import { MarkdownParagraph } from './Paragraph'
import { MarkdownCode } from './Code'

export interface MarkdownProps {
  children: string
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        a: MarkdownLink,
        p: MarkdownParagraph,
        code: MarkdownCode,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
