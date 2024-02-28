import * as yup from 'yup'
import { Document } from '@utils/getDocuments'
import { createValidatorFromSchema } from '@utils/createValidatorFromSchema'

export const BLOG_POST_METADATA_SCHEMA = yup
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

export type BlogPostMetadata = yup.InferType<typeof BLOG_POST_METADATA_SCHEMA>
export type BlogPostDocument = Document<BlogPostMetadata>

export const BLOG_POST_METADATA_VALIDATOR = createValidatorFromSchema(
  BLOG_POST_METADATA_SCHEMA,
)
