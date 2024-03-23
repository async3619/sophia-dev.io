import * as yup from 'yup'
import { Document } from '@utils/getDocuments'
import { createValidatorFromSchema } from '@utils/createValidatorFromSchema'

interface BaseReviewPostMetadata extends yup.AnyObject {
  title: string
  createdAt: string
  releasedAt: string
  rating: number // 1 ~ 10
  coverImage: string
  genres: string[]
  quote: string
}

export interface MovieReviewMetadata extends BaseReviewPostMetadata {
  type: 'movie'
  directors: string[]
  mainActors: string[]
  supportingActors: string[]
  ratings: number[]
  duration: number
  headerImage: string
  posterWidth: number
  posterHeight: number
}

export interface MusicTrack {
  no: number
  title: string
  artists: string[]
  length: string
  isExplicit: boolean
  isTitle: boolean
}

export interface MusicReviewMetadata extends BaseReviewPostMetadata {
  type: 'music'
  artists: string[]
  tracks: MusicTrack[]
}

type ReviewMetadata = MovieReviewMetadata | MusicReviewMetadata

function baseShape() {
  return {
    title: yup.string().required(),
    createdAt: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/)
      .required(),
    releasedAt: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .required(),
    rating: yup.number().min(1).max(10).required(),
    coverImage: yup.string().required(),
    genres: yup.array().of(yup.string().required()).required(),
    quote: yup.string().required(),
  }
}

const MOVIE_REVIEW_METADATA_SCHEMA = yup
  .object()
  .shape({
    ...baseShape(),
    type: yup.string<'movie'>().required().oneOf(['movie']),
    directors: yup.array().of(yup.string().required()).required(),
    mainActors: yup.array().of(yup.string().required()).required(),
    supportingActors: yup.array().of(yup.string().required()).required(),
    ratings: yup.array().of(yup.number().required()).required(),
    duration: yup.number().required(),
    headerImage: yup.string().required(),
    posterWidth: yup.number().required(),
    posterHeight: yup.number().required(),
  })
  .required()

const MUSIC_REVIEW_METADATA_SCHEMA = yup
  .object()
  .shape({
    ...baseShape(),
    type: yup.string<'music'>().required().oneOf(['music']),
    artists: yup.array().of(yup.string().required()).required(),
    tracks: yup
      .array()
      .of(
        yup.object().shape({
          no: yup.number().required(),
          title: yup.string().required(),
          artists: yup.array().of(yup.string().required()).required(),
          length: yup.string().required(),
          isExplicit: yup.boolean().required(),
          isTitle: yup.boolean().required(),
        }),
      )
      .required(),
  })
  .required()

export const MUSIC_REVIEW_METADATA_VALIDATOR = createValidatorFromSchema(
  MUSIC_REVIEW_METADATA_SCHEMA,
)

export const MOVIE_REVIEW_METADATA_VALIDATOR = createValidatorFromSchema(
  MOVIE_REVIEW_METADATA_SCHEMA,
)

export const REVIEW_POST_METADATA_VALIDATOR = (
  data: unknown,
): ReviewMetadata => {
  if (typeof data !== 'object' || !data || !('type' in data)) {
    throw new Error('Invalid metadata')
  }

  if (data.type === 'movie') {
    return MOVIE_REVIEW_METADATA_VALIDATOR(data)
  } else if (data.type === 'music') {
    return MUSIC_REVIEW_METADATA_VALIDATOR(data)
  }

  throw new Error('Invalid metadata')
}

export type ReviewPostDocument = Document<ReviewMetadata>
export type MovieReviewPostDocument = Document<MovieReviewMetadata>
export type MusicReviewPostDocument = Document<MusicReviewMetadata>

export function isMovieReviewDocument(
  document: ReviewPostDocument,
): document is MovieReviewPostDocument {
  return document.metadata.type === 'movie'
}

export function isMusicReviewDocument(
  document: ReviewPostDocument,
): document is MusicReviewPostDocument {
  return document.metadata.type === 'music'
}
