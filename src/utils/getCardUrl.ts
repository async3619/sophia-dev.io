import dayjs from 'dayjs'
import { StaticBaseProps } from '@utils/getDocument'

export function getCardUrl(
  document: StaticBaseProps<{ title: string; createdAt: string }>,
  title = document.metadata.title,
) {
  return `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/blog-card?${new URLSearchParams(
    {
      title,
      date: dayjs(document.metadata.createdAt).format('YYYY년 M월 D일'),
      'reading-time': Math.ceil(document.readingTime.minutes).toString(),
    },
  )}`
}
