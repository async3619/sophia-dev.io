import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const suiteRegular = await fetch(
    new URL('./SUITE-Regular.woff', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const suiteExtraBold = await fetch(
    new URL('./SUITE-ExtraBold.woff', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const title = searchParams.get('title')
  const date = searchParams.get('date')
  const readingTime = searchParams.get('reading-time')

  if (!title) {
    throw new Error('Title search param is required.')
  } else if (!date) {
    throw new Error('Date search param is required.')
  } else if (!readingTime) {
    throw new Error('Reading time search param is required.')
  }

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
        <p
          style={{
            fontSize: '30px',
            margin: 0,
            opacity: 0.5,
          }}
        >
          개발자 /소피아/
        </p>
        <h1
          style={{
            fontSize: '48px',
            margin: '6px 0 18px',
            fontWeight: 'bold',
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: '24px', margin: 0, opacity: 0.5 }}>
          {date} · 읽는데 {readingTime}분
        </p>
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
