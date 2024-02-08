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
  const title = searchParams.get('title')
  const description = searchParams.get('description')
  const pageTitle = locale === 'ko' ? '개발자 /소피아/' : 'Sophia, a /webdev/'

  if (!title) {
    throw new Error('Title search param is required.')
  } else if (!description) {
    throw new Error('Description search param is required.')
  }

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
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <p
              style={{
                fontSize: '3rem',
                margin: 0,
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              🌧
            </p>
            <div style={{ display: 'flex', flex: '1 1 auto' }} />
            <p
              style={{
                fontSize: '2rem',
                margin: 0,
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              {pageTitle}
            </p>
          </div>
          <div style={{ display: 'flex', flex: '1 1 auto' }} />
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p
                style={{
                  fontSize: '4rem',
                  margin: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                {title}
              </p>
            </div>
            <p
              style={{
                margin: '0.75rem 0 0',
                fontSize: '2.5rem',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              {description}
            </p>
          </div>
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
