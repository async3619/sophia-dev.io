import * as Styled from './AlbumInformation.styled'
import { MusicReviewMetadata } from '@constants/review'

export interface AlbumInformationProps {
  metadata: MusicReviewMetadata
}

export function AlbumInformation({ metadata }: AlbumInformationProps) {
  return (
    <Styled.Root>
      <table>
        <tbody>
          <tr>
            <th>앨범명</th>
            <td>{metadata.title}</td>
          </tr>
          <tr>
            <th>발매일</th>
            <td>{metadata.releasedAt}</td>
          </tr>
          <tr>
            <th>아티스트</th>
            <td>{metadata.artists.join(', ')}</td>
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
