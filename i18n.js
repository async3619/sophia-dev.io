module.exports = {
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  pages: {
    '*': ['common'],
    '/blog': ['blog'],
    '/blog/[slug]': ['blog'],
  },
  interpolation: {
    prefix: '${',
    suffix: '}',
  },
  loadLocaleFrom: async (locale, namespace) =>
    import(`./src/locales/${namespace}.${locale}`).then((r) => r.default),
}
