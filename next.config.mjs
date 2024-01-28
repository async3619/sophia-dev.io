import withMDXFactory from '@next/mdx'

const withMDX = withMDXFactory()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  i18n: {
    locales: ['en', 'ko'],
    defaultLocale: 'ko',
  },
}

export default withMDX(nextConfig)
