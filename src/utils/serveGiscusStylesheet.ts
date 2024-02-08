import { NextApiHandler } from 'next'
import { getWebsiteBaseUrl } from '@utils/getWebsiteBaseUrl'

export function serveGiscusStylesheet(theme: 'dark' | 'light'): NextApiHandler {
  return async (_, res) => {
    const baseUrl = getWebsiteBaseUrl(false)
    const stylesheet = await fetch(`${baseUrl}/giscus-${theme}.css`).then(
      (response) => response.text(),
    )

    res.setHeader('Access-Control-Allow-Origin', 'https://giscus.app')
    res.setHeader('Content-Type', 'text/css')
    res.status(200).send(stylesheet)
  }
}
