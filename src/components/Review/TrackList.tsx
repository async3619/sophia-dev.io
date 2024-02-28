import * as Styled from './TrackList.styled'
import { MusicTrack } from '@constants/review'
import { Typography } from '@mui/material'

export interface ReviewTrackListProps {
  tracks: MusicTrack[]
}

export function ReviewTrackList({ tracks }: ReviewTrackListProps) {
  return (
    <Styled.Root>
      {tracks.map(({ length, title, isTitle, no, isExplicit }, index) => (
        <Styled.Track key={index}>
          <Styled.Content>
            <Typography variant="body1" component="span" sx={{ mr: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="body2" component="span" color="text.secondary">
              {length}
            </Typography>
            {isTitle && <Styled.TitleBadge />}
            {isExplicit && <Styled.ExplicitBadge />}
          </Styled.Content>
        </Styled.Track>
      ))}
    </Styled.Root>
  )
}
