import { Stack, Typography } from '@mui/material'
import * as Styled from './BlogMetadata.styled'
import React from 'react'

export interface BlogMetadataProps {
  tokens: string[]
}

export function BlogMetadata({ tokens }: BlogMetadataProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      {tokens.map((token, index) => (
        <React.Fragment key={token}>
          <Typography variant="body2" color="text.secondary" key={index}>
            {token}
          </Typography>
          {index < tokens.length - 1 && <Styled.Separator />}
        </React.Fragment>
      ))}
    </Stack>
  )
}
