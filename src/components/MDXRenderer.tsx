import { MDXRemote } from 'next-mdx-remote'

import { Title } from '@components/Title'

import { MarkdownCode } from '@components/Markdown/Code'
import { MarkdownParagraph } from '@components/Markdown/Paragraph'
import { MarkdownLink } from '@components/Markdown/Link'
import { MarkdownFigure } from '@components/Markdown/Figure'
import { MarkdownCodeBlock } from '@components/Markdown/CodeBlock'
import { MarkdownImage } from '@components/Markdown/Image'

import { StaticBaseProps } from '@utils/getDocument'

export interface MDXRendererProps {
  source: StaticBaseProps['source']
}

const components = {
  Title,
  code: MarkdownCode,
  p: MarkdownParagraph,
  a: MarkdownLink,
  figure: MarkdownFigure,
  pre: MarkdownCodeBlock,
  img: MarkdownImage,
}

export function MDXRenderer({ source }: MDXRendererProps) {
  return <MDXRemote {...source} components={components} />
}
