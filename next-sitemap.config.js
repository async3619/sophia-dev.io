/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sophia-dev.io',
  generateRobotsTxt: true,
  exclude: ['/*/404', '/*/500', '/404', '/500'],
}
