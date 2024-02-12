import urlSlug from 'url-slug'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { configDotenv } from 'dotenv'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { MusicReviewMetadata } from '../../src/constants/review'
import { BugsAlbumData } from './bugs'

dayjs.extend(duration)

configDotenv({ path: './.env.development.local' })
if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET')
}

const spotify = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
  [],
)

const SPOTIFY_ALBUM_URL_REGEX = /https:\/\/open\.spotify\.com\/album\/(.+)/

export function getSpotifyUrlArgument() {
  const spotifyAlbumUrl = process.argv.find((arg) =>
    SPOTIFY_ALBUM_URL_REGEX.test(arg),
  )

  if (!spotifyAlbumUrl) {
    throw new Error('Missing spotify album URL')
  }

  return spotifyAlbumUrl
}

export async function fetchSpotifyAlbum(
  albumUrl: string,
  partialData: BugsAlbumData,
): Promise<[slug: string, MusicReviewMetadata]> {
  if (!SPOTIFY_ALBUM_URL_REGEX.test(albumUrl)) {
    throw new Error('Invalid album URL')
  }

  const albumId = albumUrl.match(SPOTIFY_ALBUM_URL_REGEX)![1]
  const album = await spotify.albums.get(albumId)

  return [
    urlSlug(album.name),
    {
      type: 'music',
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      releasedAt: album.release_date,
      rating: 0,
      coverImage: album.images[0].url,
      genres: album.genres,
      ...partialData,
      tracks: partialData.tracks.map((track) => {
        const spotifyTrack = album.tracks.items.find(
          (spotifyTrack) => spotifyTrack.track_number === track.no,
        )

        if (!spotifyTrack) {
          throw new Error(
            'Failed to find track matching track number between bugs and spotify',
          )
        }

        return {
          ...track,
          length: dayjs.duration(spotifyTrack.duration_ms).format('mm:ss'),
        }
      }),
    },
  ]
}
