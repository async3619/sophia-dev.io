import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const suiteRegular = await fetch(
    new URL('./SUITE-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const locale = searchParams.get('locale') ?? 'ko'
  const pageTitle = locale === 'ko' ? '개발자 /소피아/' : 'Sophia, a /webdev/'

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#1b1b1b',
          color: '#fff',
          display: 'flex',
          height: '100%',
          width: '100%',
          padding: '2rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontSize: '4rem',
              margin: 0,
              color: 'rgba(255, 255, 255, 0.75)',
            }}
          >
            {pageTitle}
          </p>
          <p
            style={{
              fontSize: '4rem',
              marginTop: 0,
              marginBottom: 0,
              marginLeft: '1rem',
              color: 'rgba(255, 255, 255, 0.75)',
            }}
          >
            🌧
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'blobmoji',
      fonts: [
        {
          style: 'normal',
          data: suiteRegular,
          lang: 'ko-KR',
          name: 'suite',
        },
      ],
    },
  )
}
