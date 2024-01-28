import type { MDXComponents } from 'mdx/types'

import { MarkdownLink } from '@components/Markdown/Link'
import { MarkdownCode } from '@components/Markdown/Code'
import { MarkdownParagraph } from '@components/Markdown/Paragraph'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: MarkdownLink,
    code: MarkdownCode,
    p: MarkdownParagraph,
    ...components,
  }
}
