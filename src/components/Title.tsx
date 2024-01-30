import React from 'react'
import Head from 'next/head'

import { Typography } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

export interface TitleProps {
  children: string
  withoutMargin?: boolean
  main?: boolean
}

export function Title({ children, withoutMargin, main }: TitleProps) {
  const { t } = useTranslation('common')
  const { asPath } = useRouter()

  let title = children
  if (!main) {
    title = title + ' - ' + t('title')
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content={t('title')} />
        <meta name="og:title" content={title} />
        <meta name="og:url" content={`https://sophia-dev.io${asPath}`} />
      </Head>
      <Typography
        variant="h2"
        fontWeight={700}
        fontSize="1.75rem"
        sx={{ mb: withoutMargin ? 0 : '0.75em' }}
      >
        {children}
      </Typography>
    </>
  )
}
