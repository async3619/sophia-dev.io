import { GetStaticProps } from 'next'
import Head from 'next/head'
import * as fs from 'fs/promises'

import { Typography } from '@mui/material'

import { Markdown } from '@components/Markdown'

interface HomeProps {
  content: string
}

export default function Home({ content }: HomeProps) {
  return (
    <>
      <Head>
        <title>개발자 /소피아/ 🌧</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography
        variant="h2"
        fontWeight="800"
        fontSize="1.75rem"
        sx={{ mb: '0.75em' }}
      >
        개발자 /소피아/ 🌧️
      </Typography>
      <Markdown>{content}</Markdown>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      content: await fs.readFile('./src/docs/index.md', 'utf8'),
    },
  }
}
