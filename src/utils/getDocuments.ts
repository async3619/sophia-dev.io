import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import * as yup from 'yup'

const METADATA_SCHEMA = yup
  .object()
  .shape({
    title: yup.string().required(),
    excerpt: yup.string().required(),
    createdAt: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/)
      .required(),
  })
  .required()

export type Metadata = yup.InferType<typeof METADATA_SCHEMA>

export interface Blog {
  slug: string
  metadata: Metadata
}

export function getDocuments(directory: string, locale?: string): Blog[] {
  const targetDirectory = path.join(process.cwd(), 'content', directory)
  const files = fs.readdirSync(targetDirectory)
  const localeCode = locale ?? 'ko'

  return files
    .filter((filePath) => filePath.endsWith(`${localeCode}.mdx`))
    .map((file) => {
      const fullPath = path.join(targetDirectory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const metadata = METADATA_SCHEMA.validateSync(data)

      return {
        slug: path.basename(file, `.${localeCode}.mdx`),
        metadata,
      }
    })
}
