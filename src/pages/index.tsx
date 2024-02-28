import { GetStaticProps } from 'next'

import * as yup from 'yup'

import { MDXRenderer } from '@components/MDXRenderer'

import { getDocument, StaticBaseProps } from '@utils/getDocument'
import { createValidatorFromSchema } from '@utils/createValidatorFromSchema'

const INDEX_PAGE_METADATA_VALIDATOR = createValidatorFromSchema(
  yup.object({}).required(),
)

interface IndexProps extends StaticBaseProps {}

export default function Index({ source }: IndexProps) {
  return <MDXRenderer source={source} />
}

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  locale,
}) => {
  const props = await getDocument(
    './',
    'index',
    INDEX_PAGE_METADATA_VALIDATOR,
    locale,
  )

  return { props: { ...props } }
}
