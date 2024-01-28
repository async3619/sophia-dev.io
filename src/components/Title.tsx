import Head from 'next/head'

import { Typography } from '@mui/material'

export interface TitleProps {
  children: React.ReactNode
}

export function Title({ children }: TitleProps) {
  return (
    <>
      <Head>
        <title>{children}</title>
      </Head>
      <Typography
        variant="h2"
        fontWeight={700}
        fontSize="1.75rem"
        sx={{ mb: '0.75em' }}
      >
        {children}
      </Typography>
    </>
  )
}
