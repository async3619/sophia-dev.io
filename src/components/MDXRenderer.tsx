import { MDXRemote } from 'next-mdx-remote'

import { Title } from '@components/Title'

import { MarkdownCode } from '@components/Markdown/Code'
import { MarkdownParagraph } from '@components/Markdown/Paragraph'
import { MarkdownLink } from '@components/Markdown/Link'

import { StaticBaseProps } from '@utils/getDocument'

export interface MDXRendererProps {
  source: StaticBaseProps['source']
}

const components = {
  Title,
  code: MarkdownCode,
  p: MarkdownParagraph,
  a: MarkdownLink,
}

export function MDXRenderer({ source }: MDXRendererProps) {
  return <MDXRemote {...source} components={components} />
}
