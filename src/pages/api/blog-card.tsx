import satori from 'satori'
import sharp from 'sharp'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const { searchParams } = new URL(`http://0.0.0.0:3000${req.url}`)

  const [suiteRegular, suiteExtraBold] = await Promise.all([
    fetch(`${process.env.FONT_STORAGE_URL}/SUITE-Regular.woff`).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(`${process.env.FONT_STORAGE_URL}/SUITE-ExtraBold.woff`).then((res) =>
      res.arrayBuffer(),
    ),
  ])

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

  const svg = await satori(
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
    </div>,
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

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer()
  return res.setHeader('content-type', 'image/png').send(pngBuffer)
}
export default handler
