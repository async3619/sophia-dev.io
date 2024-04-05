import path from 'path'
import fs from 'fs'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import rehypePrettyCode, { Options } from 'rehype-pretty-code'

import readingTime from 'reading-time'

import { Validator } from '@utils/getDocuments'

export interface StaticBaseProps<TMetadata = Record<string, any>> {
  source: MDXRemoteSerializeResult
  metadata: TMetadata
  readingTime: ReturnType<typeof readingTime>
}

export async function getDocument<T>(
  directory: string,
  name: string,
  metadataValidator: Validator<T>,
  locale?: string,
): Promise<StaticBaseProps<T>> {
  const targetDirectory = path.join(process.cwd(), 'content', directory)
  const fullPath = path.join(targetDirectory, `${name}.${locale ?? 'ko'}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const time = readingTime(fileContents)

  const { content, data } = matter(fileContents)
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      rehypePlugins: [
        [
          rehypePrettyCode as any,
          {
            theme: 'material-theme',
            grid: true,
          } as Options,
        ],
      ],
    },
  })
  const metadata = metadataValidator(data)

  return {
    source: mdxSource,
    metadata,
    readingTime: time,
  }
}
