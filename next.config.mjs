import nextTranslate from 'next-translate-plugin'
import createRemoteRefresh from 'next-remote-refresh'
import { join } from 'node:path'

const withRemoteRefresh = createRemoteRefresh({
  paths: [join(process.cwd(), './content')],
  ignored: '**/*.json',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
  compiler: {
    emotion: true,
  },
  headers: async () =>
    [
      {
        source: '/giscus-(.*).css',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://giscus.app',
          },
        ]
      }
    ],
}

export default withRemoteRefresh(nextTranslate((nextConfig)))
