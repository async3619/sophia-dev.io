import dayjs from 'dayjs'

import { MovieReviewMetadata } from '@constants/review'

import * as Styled from './MovieInformation.styled'
import { useMemo } from 'react'

export interface MovieInformationProps {
  metadata: MovieReviewMetadata
}

export function MovieInformation({ metadata }: MovieInformationProps) {
  const year = dayjs(metadata.releasedAt, 'YYYY-MM-DD').format('YYYY')

  const formattedRunningTime = useMemo(() => {
    const seconds = metadata.duration
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours === 0) {
      return `${minutes}분`
    }

    if (minutes === 0) {
      return `${hours}시간`
    }

    return `${hours}시간 ${minutes}분`
  }, [metadata.duration])

  return (
    <Styled.Root>
      <table>
        <tbody>
          <tr>
            <th>앨범명</th>
            <td>{metadata.title}</td>
          </tr>
          <tr>
            <th>개봉년도</th>
            <td>{year}년</td>
          </tr>
          <tr>
            <th>장르</th>
            <td>{metadata.genres.join(', ')}</td>
          </tr>
          <tr>
            <th>상영 시간</th>
            <td>{formattedRunningTime}</td>
          </tr>
          <tr>
            <th>감독</th>
            <td>{metadata.directors.join(', ')}</td>
          </tr>
          <tr>
            <th>출연진</th>
            <td>
              {metadata.mainActors.join(', ')}, 외{' '}
              {metadata.supportingActors.length}명
            </td>
          </tr>
          <tr>
            <th>한줄평</th>
            <td>
              <i>{metadata.quote}</i>
            </td>
          </tr>
        </tbody>
      </table>
    </Styled.Root>
  )
}
