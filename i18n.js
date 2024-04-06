module.exports = {
  locales: ['ko'],
  defaultLocale: 'ko',
  pages: {
    '*': ['common'],
    '/blog': ['blog'],
    '/blog/[slug]': ['blog'],
    '/review': ['review'],
    '/review/[slug]': ['review'],
    '/review/albums/[slug]': ['review'],
    '/review/movies/[slug]': ['review'],
  },
  interpolation: {
    prefix: '${',
    suffix: '}',
  },
  loadLocaleFrom: async (locale, namespace) =>
    import(`./src/locales/${namespace}.${locale}`).then((r) => r.default),
}
