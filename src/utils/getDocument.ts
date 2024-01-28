import path from 'path'
import fs from 'fs'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'

export interface StaticBaseProps {
  source: MDXRemoteSerializeResult
  frontMatter: { [key: string]: any }
}

export async function getDocument(
  directory: string,
  name: string,
  locale?: string,
) {
  const targetDirectory = path.join(process.cwd(), 'content', directory)
  const fullPath = path.join(targetDirectory, `${name}.${locale ?? 'ko'}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { content, data } = matter(fileContents)
  const mdxSource = await serialize(content, { scope: data })

  return {
    source: mdxSource,
    frontMatter: data,
  }
}
