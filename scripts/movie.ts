import { fetchWatchaMovieData } from './utils/watcha'
import path from 'path'
import fs from 'fs-extra'
import fetch from 'node-fetch'
import yaml from 'yaml'
import sharp from 'sharp'

const POSTER_PATH = path.join(
  process.cwd(),
  'public',
  'static',
  'review',
  'poster',
)

const HEADER_IMAGE_PATH = path.join(
  process.cwd(),
  'public',
  'static',
  'review',
  'header',
)

async function downloadImage(url: string, filePath: string) {
  await fs.ensureDir(path.dirname(filePath))

  const res = await fetch(url)
  const fileStream = fs.createWriteStream(filePath)
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream)
    res.body.on('error', reject)
    fileStream.on('finish', resolve)
  })
}

async function main() {
  const watchaUrl = process.argv.at(-1)
  if (!watchaUrl) {
    throw new Error('Missing watcha URL')
  }

  const [metadata, slug] = await fetchWatchaMovieData(watchaUrl)

  const posterPath = path.join(POSTER_PATH, `${slug}.jpg`)
  await downloadImage(metadata.coverImage, posterPath)

  const headerPath = path.join(HEADER_IMAGE_PATH, `${slug}.jpg`)
  await downloadImage(metadata.headerImage, headerPath)

  metadata.coverImage = `/static/review/poster/${slug}.jpg`
  metadata.headerImage = `/static/review/header/${slug}.jpg`

  const posterMetadata = await sharp(posterPath).metadata()
  if (!posterMetadata.width || !posterMetadata.height) {
    throw new Error('Invalid poster metadata')
  }

  const fullMetadata = {
    ...metadata,
    posterWidth: posterMetadata.width,
    posterHeight: posterMetadata.height,
  }

  const metadataString = yaml.stringify(fullMetadata, {
    defaultKeyType: 'PLAIN',
    defaultStringType: 'QUOTE_DOUBLE',
  })

  const reviewContent = `---\n${metadataString.trim()}\n---\n\n`
  const reviewFilename = path.join(
    process.cwd(),
    'content',
    'review',
    'movies',
    `${slug}.ko.mdx`,
  )

  await fs.ensureDir(path.dirname(reviewFilename))
  await fs.writeFile(reviewFilename, reviewContent)
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
