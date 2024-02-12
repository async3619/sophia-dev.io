import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import { MusicTrack } from '../../src/constants/review'

const BUGS_ALBUM_URL_REGEX = /https:\/\/music.bugs.co.kr\/album\/(\d+)/

export function getBugsUrlArgument() {
  const bugsAlbumUrl = process.argv.find((arg) =>
    BUGS_ALBUM_URL_REGEX.test(arg),
  )

  if (!bugsAlbumUrl) {
    throw new Error('Missing bugs album URL')
  }

  return bugsAlbumUrl
}

export interface BugsAlbumData {
  title: string
  artists: string[]
  tracks: Omit<MusicTrack, 'length'>[]
}

const ARTIST_LIST_PARSER = /'(.+?)'/

export async function fetchBugsAlbumData(
  albumUrl: string,
): Promise<BugsAlbumData> {
  if (!BUGS_ALBUM_URL_REGEX.test(albumUrl)) {
    throw new Error('Invalid album URL')
  }

  const albumId = albumUrl.match(BUGS_ALBUM_URL_REGEX)![1]
  const response = await fetch(
    `https://music.bugs.co.kr/album/${albumId}`,
  ).then((res) => res.text())

  const {
    window: { document },
  } = new JSDOM(response)

  const tracks: BugsAlbumData['tracks'] = []
  const trackRows = Array.from(document.querySelectorAll('tr[trackid]'))
  for (const trackRow of trackRows) {
    const trackNo = parseInt(
      trackRow.querySelector('.trackIndex > em')?.textContent!,
      10,
    )
    const trackTitle = trackRow
      .querySelector('p.title > a')
      ?.textContent?.trim()

    if (!trackTitle) {
      throw new Error('Invalid track title')
    }

    const isTitle = !!trackRow.querySelector('.trackIndex > .albumTitle')
    const isExplicit = !!trackRow.querySelector('p.title > .badge.o19')

    const artists: string[] = []
    const moreArtists = trackRow.querySelector('[name="atag_martist_list"]')
    if (!moreArtists) {
      const artistName = trackRow
        .querySelector('.artist > a')
        ?.textContent?.trim()

      if (!artistName) {
        throw new Error('Invalid artist list')
      }

      artists.push(artistName)
    } else {
      const script = moreArtists?.getAttribute('onclick')
      if (!script) {
        throw new Error('Invalid artist list')
      }

      const artistList = ARTIST_LIST_PARSER.exec(script)![1]
      artists.push(...artistList.split('\\\\n').map((s) => s.split('||')[1]))
    }

    tracks.push({
      no: trackNo,
      title: trackTitle!,
      artists,
      isTitle,
      isExplicit,
    })
  }

  const title = document
    .querySelector('.pgTitle > .innerContainer')
    ?.textContent?.trim()

  if (!title) {
    throw new Error('Invalid album title')
  }

  const artistList = document.querySelector('.basicInfo tr:nth-child(1) > td')
  if (!artistList) {
    throw new Error('Missing artist list')
  }

  const artistDOMList = artistList.querySelectorAll('a')
  const artists = Array.from(artistDOMList).map((artist) => {
    const artistName = artist.textContent?.trim()
    if (!artistName) {
      throw new Error('Invalid artist name')
    }

    return artistName
  })

  return {
    title,
    artists,
    tracks,
  }
}
