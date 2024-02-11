import * as yup from 'yup'
import { Document } from '@utils/getDocuments'

interface BaseReviewPostMetadata extends yup.AnyObject {
  title: string
  createdAt: string
  rating: number // 1 ~ 10
  coverImage: string
  genres: string[]
}

interface MovieReviewMetadata extends BaseReviewPostMetadata {
  type: 'movie'
  director: string
  actors: string[]
}

interface MusicReviewMetadata extends BaseReviewPostMetadata {
  type: 'music'
  artists: string[]
  tracks: string[]
}

type ReviewMetadata = MovieReviewMetadata | MusicReviewMetadata

const MOVIE_REVIEW_METADATA_SCHEMA = yup
  .object()
  .shape({
    type: yup.string<'movie'>().required().oneOf(['movie']),
    title: yup.string().required(),
    createdAt: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/)
      .required(),
    rating: yup.number().min(1).max(10).required(),
    coverImage: yup.string().required(),
    genres: yup.array().of(yup.string().required()).required(),
    director: yup.string().required(),
    actors: yup.array().of(yup.string().required()).required(),
  })
  .required()

const MUSIC_REVIEW_METADATA_SCHEMA = yup
  .object()
  .shape({
    type: yup.string<'music'>().required().oneOf(['music']),
    title: yup.string().required(),
    createdAt: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/)
      .required(),
    rating: yup.number().min(1).max(10).required(),
    coverImage: yup.string().required(),
    genres: yup.array().of(yup.string().required()).required(),
    artists: yup.array().of(yup.string().required()).required(),
    tracks: yup.array().of(yup.string().required()).required(),
  })
  .required()

export const REVIEW_POST_METADATA_VALIDATOR = (
  data: unknown,
): ReviewMetadata => {
  if (typeof data !== 'object' || !data || !('type' in data)) {
    throw new Error('Invalid metadata')
  }

  if (data.type === 'movie') {
    return MOVIE_REVIEW_METADATA_SCHEMA.validateSync(data)
  } else if (data.type === 'music') {
    return MUSIC_REVIEW_METADATA_SCHEMA.validateSync(data)
  }

  throw new Error('Invalid metadata')
}

export type ReviewPostDocument = Document<ReviewMetadata>
