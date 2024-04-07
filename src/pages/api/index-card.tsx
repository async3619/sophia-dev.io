import satori from 'satori'
import sharp from 'sharp'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const [suiteRegular, suiteExtraBold] = await Promise.all([
    fetch(`${process.env.FONT_STORAGE_URL}/SUITE-Regular.woff`).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(`${process.env.FONT_STORAGE_URL}/SUITE-ExtraBold.woff`).then((res) =>
      res.arrayBuffer(),
    ),
  ])

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
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          margin: 0,
        }}
      >
        개발자 /소피아/
      </h1>
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
