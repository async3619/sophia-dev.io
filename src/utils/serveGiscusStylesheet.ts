import { NextApiHandler } from 'next'

export function serveGiscusStylesheet(theme: 'dark' | 'light'): NextApiHandler {
  return async (_, res) => {
    const stylesheet = await fetch(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/giscus-${theme}.css`,
    ).then((response) => response.text())

    res.setHeader('Access-Control-Allow-Origin', 'https://giscus.app')
    res.setHeader('Content-Type', 'text/css')
    res.status(200).send(stylesheet)
  }
}
