import { MovieReviewMetadata } from '../../src/constants/review'
import dayjs from 'dayjs'
import urlSlug from 'url-slug'

export interface WatchaAPIResult {
  result: Result
}

export interface Result {
  code: string
  content_type: string
  title: string
  year: number
  poster: {
    hd: string
    xlarge: string
    large: string
    medium: string
    small: string
  }
  badges: Array<{
    service: string
    name: string
    image: string
  }>
  on_watchaplay: boolean
  ratings_avg: number
  director_names: string[]
  ratings_count: number
  wishes_count: number
  stillcut: {
    original: string
    fullhd: string
    xlarge: string
    large: string
    medium: string
    small: string
  }
  nations: Array<{
    name: string
  }>
  genres: string[]
  current_context: any
  description: string
  short_description: string
  credits: Credits
  display_comments_count: string
  ratings_distribution: Record<number, number>
  gallery: Array<{
    original: string
    fullhd: string
    xlarge: string
    large: string
    medium: string
    small: string
  }>
  decks_count: number
  ranking: any
  original_title: string
  duration: number
  age_rating_short: string
  age_rating_long: string
}

export interface Credits {
  prev_uri: any
  next_uri: string
  result: Array<{
    type: string
    department: string
    job: string
    character: string[]
    person: {
      id: number
      code: string
      name: string
    }
    is_clickable: boolean
  }>
}

const WATCHA_URL_REGEX = /https:\/\/pedia\.watcha\.com\/.+\/contents\/(.+)/
const WATCHA_BASE_URL = 'https://pedia.watcha.com/api/contents'

enum CreditType {
  Director = '감독',
  MainActor = '주연',
  SupportingActor = '조연',
}

async function getAllCredits(
  credits: Credits,
  result: Record<CreditType, Credits['result'][0]['person'][]> = {
    [CreditType.Director]: [],
    [CreditType.MainActor]: [],
    [CreditType.SupportingActor]: [],
  },
): Promise<Record<CreditType, Credits['result'][0]['person'][]>> {
  const directors = credits.result.filter(
    (credit) => credit.type.split('::').at(-1) === 'Director',
  )

  const mainActors = credits.result.filter(
    (credit) => credit.type.split('::').at(-1) === 'Main Actor',
  )

  const supportingActors = credits.result.filter(
    (credit) => credit.type.split('::').at(-1) === 'Supporting Actor',
  )

  result[CreditType.Director].push(...directors.map((c) => c.person))
  result[CreditType.MainActor].push(...mainActors.map((c) => c.person))
  result[CreditType.SupportingActor].push(
    ...supportingActors.map((c) => c.person),
  )

  if (credits.next_uri) {
    const nextCreditsString = await fetch(
      `${WATCHA_BASE_URL}${credits.next_uri}`,
    ).then((res) => res.text())

    if (!nextCreditsString) {
      return result
    }

    const nextCredits: Credits = JSON.parse(nextCreditsString)
    return getAllCredits(nextCredits, result)
  }

  return result
}

async function fetchMovie(
  code: string,
  lang: 'ko' | 'en' = 'ko',
): Promise<WatchaAPIResult> {
  return fetch(`${WATCHA_BASE_URL}/${code}`, {
    headers: {
      'x-frograms-app-code': 'Galaxy',
      'x-frograms-client': 'Galaxy-Web-App',
      'x-frograms-client-version': '2.1.0',
      'x-frograms-device-identifier': 'web-PQgvlfgVZYROMql5QoWlC1Z37VMoxa',
      'x-frograms-galaxy-language': lang,
      'x-frograms-galaxy-region': 'KR',
      'x-frograms-version': '2.1.0',
      'x-watcha-client-language': lang,
      'x-watcha-client-region': 'KR',
    },
  }).then((res) => res.json())
}

export async function fetchWatchaMovieData(
  watchaUrl: string,
): Promise<
  [Omit<MovieReviewMetadata, 'posterWidth' | 'posterHeight'>, string]
> {
  if (!WATCHA_URL_REGEX.test(watchaUrl)) {
    throw new Error('Invalid watcha URL')
  }

  const contentCode = watchaUrl.match(WATCHA_URL_REGEX)![1]
  const koreanResult = await fetchMovie(contentCode)
  const englishResult = await fetchMovie(contentCode, 'en')

  const credits = await getAllCredits(koreanResult.result.credits)

  return [
    {
      type: 'movie',
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      releasedAt: dayjs(koreanResult.result.year.toString(), 'YYYY').format(
        'YYYY-MM-DD',
      ),
      title: koreanResult.result.title,
      year: koreanResult.result.year,
      coverImage: koreanResult.result.poster.xlarge,
      genres: koreanResult.result.genres,
      quote: koreanResult.result.short_description,
      rating: koreanResult.result.ratings_avg,
      directors: credits[CreditType.Director].map((d) => d.name),
      mainActors: credits[CreditType.MainActor].map((a) => a.name),
      supportingActors: credits[CreditType.SupportingActor].map((a) => a.name),
      duration: koreanResult.result.duration,
      ratings: Object.entries(koreanResult.result.ratings_distribution).map(
        ([, count]) => count,
      ),
      headerImage: koreanResult.result.stillcut.xlarge,
    },
    urlSlug(`${englishResult.result.title}-${englishResult.result.year}`),
  ]
}
