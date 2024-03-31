import { Html, Head, Main, NextScript } from 'next/document'
import { getInitColorSchemeScript } from '@mui/material/styles'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        {getInitColorSchemeScript()}
        <Main />
        <NextScript />
        <div id="backdrop-root" />
      </body>
    </Html>
  )
}
