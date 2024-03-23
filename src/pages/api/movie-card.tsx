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

  const slug = searchParams.get('slug')
  let title = searchParams.get('title')
  const description = searchParams.get('description')

  if (!slug) {
    throw new Error('Please provide a `slug` query parameter')
  } else if (!title) {
    throw new Error('Title search param is required.')
  } else if (!description) {
    throw new Error('Description search param is required.')
  }

  const locale = searchParams.get('locale') ?? 'ko'
  const pageTitle = locale === 'ko' ? '개발자 /소피아/' : 'Sophia, a /webdev/'
  title = `[${title}] ${locale === 'ko' ? '리뷰' : 'Reviews'}`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
        }}
      >
        <img
          src={`https://sophia-dev.io/static/review/header/${slug}.jpg`}
          style={{
            display: 'block',
            position: 'absolute',
            top: '50%',
            left: '0',
            transform: 'translateY(-50%)',
            filter: 'blur(20px) brightness(0.25) grayscale(0.75)',
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              padding: '2rem',
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
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
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
                    color: 'rgba(255, 255, 255, 0.75)',
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
