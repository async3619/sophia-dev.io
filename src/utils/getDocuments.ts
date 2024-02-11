import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Document<TMetadata> {
  slug: string
  metadata: TMetadata
}

export type Validator<T> = (data: unknown) => T

export function getDocuments<T>(
  directory: string,
  metadataValidator: Validator<T>,
  locale?: string,
): Document<T>[] {
  const targetDirectory = path.join(process.cwd(), 'content', directory)
  const files = fs.readdirSync(targetDirectory)
  const localeCode = locale ?? 'ko'

  return files
    .filter((filePath) => filePath.endsWith(`${localeCode}.mdx`))
    .map((file) => {
      const fullPath = path.join(targetDirectory, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const metadata = metadataValidator(data)

      return {
        slug: path.basename(file, `.${localeCode}.mdx`),
        metadata,
      }
    })
}
