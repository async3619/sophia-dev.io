import { useMemo } from 'react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

export function useFormattedDate(dateString: string) {
  const { locale } = useRouter()
  const formattedDate = useMemo(() => {
    if (!locale) {
      throw new Error('locale is not defined')
    }

    const date = dayjs(dateString, 'YYYY-MM-DD HH:mm:ss').toDate()
    return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date)
  }, [dateString, locale])

  return formattedDate
}
