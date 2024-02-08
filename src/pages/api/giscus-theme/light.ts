import { NextApiHandler } from 'next'
import fs from 'fs'

const giscusTheme: NextApiHandler = (req, res) => {
  const stylesheet = fs.readFileSync('./public/giscus-light.css', 'utf-8')

  res.setHeader('Access-Control-Allow-Origin', 'https://giscus.app')
  res.setHeader('Content-Type', 'text/css')
  res.status(200).send(stylesheet)
}

export default giscusTheme
