import fs from 'fs-extra'
import path from 'path'
import yaml from 'yaml'
import fetch from 'node-fetch'

import { fetchBugsAlbumData, getBugsUrlArgument } from './utils/bugs'
import { fetchSpotifyAlbum, getSpotifyUrlArgument } from './utils/spotify'

const ALBUM_ART_PATH = path.join(process.cwd(), 'public', 'static', 'review')
const REVIEW_PATH = path.join(process.cwd(), 'content', 'review')

async function main() {
  const bugsAlbumUrl = getBugsUrlArgument()
  const spotifyAlbumUrl = getSpotifyUrlArgument()

  const bugsAlbum = await fetchBugsAlbumData(bugsAlbumUrl)
  const [slug, metadata] = await fetchSpotifyAlbum(spotifyAlbumUrl, bugsAlbum)

  const coverImageBuffer = await fetch(metadata.coverImage).then((res) =>
    res.buffer(),
  )

  await fs.ensureDir(ALBUM_ART_PATH)

  const coverImageFilename = path.join(ALBUM_ART_PATH, `${slug}.jpg`)
  await fs.writeFile(coverImageFilename, coverImageBuffer)

  metadata.coverImage = `/static/review/${slug}.jpg`

  const metadataString = yaml.stringify(metadata, {
    defaultKeyType: 'PLAIN',
    defaultStringType: 'QUOTE_DOUBLE',
  })

  const reviewContent = `---\n${metadataString.trim()}\n---\n\n`
  const reviewFilename = path.join(REVIEW_PATH, `${slug}.ko.mdx`)

  await fs.ensureDir(REVIEW_PATH)
  await fs.writeFile(reviewFilename, reviewContent)
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
