import path from 'path'
import fs from 'fs'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'

import readingTime from 'reading-time'

export interface StaticBaseProps<TMetadata = Record<string, any>> {
  source: MDXRemoteSerializeResult
  metadata: TMetadata
  readingTime: ReturnType<typeof readingTime>
}

export async function getDocument<TMetadata = Record<string, any>>(
  directory: string,
  name: string,
  locale?: string,
): Promise<StaticBaseProps<TMetadata>> {
  const targetDirectory = path.join(process.cwd(), 'content', directory)
  const fullPath = path.join(targetDirectory, `${name}.${locale ?? 'ko'}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const time = readingTime(fileContents)

  const { content, data } = matter(fileContents)
  const mdxSource = await serialize(content, { scope: data })

  return {
    source: mdxSource,
    metadata: data as TMetadata,
    readingTime: time,
  }
}
