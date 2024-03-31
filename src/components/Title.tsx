import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { Typography } from '@mui/material'
import { useIntersection } from '@hooks/useIntersection'
import { useUIStore } from '@stores/ui'

export interface TitleProps {
  children: string
  withoutMargin?: boolean
  main?: boolean
}

export function Title({ children, withoutMargin, main }: TitleProps) {
  const { t } = useTranslation('common')
  const { asPath } = useRouter()
  const [titleRef, isTitleIntersecting] = useIntersection<HTMLElement>()
  const setTitleIntersecting = useUIStore((state) => state.setTitleIntersecting)
  const setCurrentTitle = useUIStore((state) => state.setCurrentTitle)

  let title = children
  if (!main) {
    title = title + ' - ' + t('title')
  }

  useEffect(() => {
    setTitleIntersecting(isTitleIntersecting)
    setCurrentTitle(children)
  }, [isTitleIntersecting, children, setTitleIntersecting, setCurrentTitle])

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
        ref={titleRef}
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
