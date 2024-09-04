import React from 'react'

import * as Styled from './ResumeSection.styled'
import { Typography } from '@mui/material'

interface ResumeSectionProps {
  children?: React.ReactNode
  title?: string
}

function ResumeSection({ children, title }: ResumeSectionProps) {
  return (
    <Styled.Root>
      {title && (
        <Typography variant="h5" fontSize="1.25rem" fontWeight={600} mb="1em">
          {title}
        </Typography>
      )}
      {children}
    </Styled.Root>
  )
}

export default ResumeSection
