import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const suiteRegular = await fetch(
    new URL('./SUITE-Regular.woff', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const suiteExtraBold = await fetch(
    new URL('./SUITE-ExtraBold.woff', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/dh9u8gpy1/image/upload/v1712481486/card-bg.png)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          height: '100%',
          width: '100%',
          padding: '48px',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          개발자 /소피아/
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          style: 'normal',
          data: suiteRegular,
          weight: 400,
          lang: 'ko-KR',
          name: 'suite',
        },
        {
          style: 'normal',
          data: suiteExtraBold,
          weight: 800,
          lang: 'ko-KR',
          name: 'suite',
        },
      ],
    },
  )
}
