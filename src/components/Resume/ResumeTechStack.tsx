import React from 'react'

import { ResumeTechStackGroup } from '@components/Resume/types'

import * as Styled from './ResumeTechStack.styled'
import { Grid, Typography } from '@mui/material'

interface ResumeTechStackProps {
  techStacks: ResumeTechStackGroup[]
}

function ResumeTechStack({ techStacks }: ResumeTechStackProps) {
  return (
    <Styled.Root>
      <Grid container spacing={3}>
        {techStacks.map((group) => {
          return (
            <>
              <Grid item xs={4}>
                <Typography variant="body1" fontWeight={600}>
                  {group.title}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={1}>
                  {group.items.map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <Typography variant="body1">· {item}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </>
          )
        })}
      </Grid>
    </Styled.Root>
  )
}

export default ResumeTechStack
