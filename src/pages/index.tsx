import { GetStaticProps } from 'next'

import { getDocument, StaticBaseProps } from '@utils/getDocument'
import { MDXRenderer } from '@components/MDXRenderer'

interface IndexProps extends StaticBaseProps {}

export default function Index({ source }: IndexProps) {
  return <MDXRenderer source={source} />
}

export const getStaticProps: GetStaticProps<IndexProps> = async ({
  locale,
}) => {
  const props = await getDocument('./', 'index', locale)

  return { props: { ...props } }
}
