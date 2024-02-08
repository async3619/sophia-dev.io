export function getWebsiteBaseUrl(client: boolean) {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  const vercelUrl = client
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : process.env.VERCEL_URL

  let baseUrl = vercelUrl || websiteUrl
  if (!baseUrl) {
    throw new Error(
      'Missing environment variable: `VERCEL_URL` or `NEXT_PUBLIC_WEBSITE_URL`',
    )
  }

  if (!/^https?:\/\//.test(baseUrl)) {
    baseUrl = `https://${baseUrl}`
  }

  return baseUrl
}
