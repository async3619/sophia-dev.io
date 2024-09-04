import React from 'react'

import * as Styled from './ResumeProject.styled'
import { ResumeProjectData } from '@components/Resume/types'
import { Box, Grid, Typography } from '@mui/material'

interface ResumeProjectProps {
  projects: ResumeProjectData[]
}

function ResumeProject({ projects }: ResumeProjectProps) {
  return (
    <Styled.Root>
      <Grid container spacing={3}>
        {projects.map((project, index) => {
          return (
            <Grid item key={index} xs={12} mb={1}>
              <Typography mb={1}>
                <Styled.Link target="_blank" href={project.url}>
                  <Typography
                    component="span"
                    variant="body1"
                    fontWeight={600}
                    display="inline-block"
                    mr={1}
                  >
                    {project.title}
                  </Typography>
                </Styled.Link>
              </Typography>
              <Box mb={2}>
                <Typography variant="h6" fontWeight={600} fontSize="1rem">
                  개요
                </Typography>
                <Typography variant="body1" pl={2}>
                  {project.summary}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="h6" fontWeight={600} fontSize="1rem">
                  설명
                </Typography>
                <Styled.List>
                  {project.description.map((content, index) => (
                    <Typography
                      key={index}
                      component="li"
                      variant="body1"
                      mb="1em"
                    >
                      {content}
                    </Typography>
                  ))}
                </Styled.List>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  fontSize="1rem"
                  mb={1}
                >
                  사용 기술
                </Typography>
                <Styled.ChipList>
                  {project.stacks.map((stack) => (
                    <Styled.Chip key={stack}>
                      <Typography variant="body2">{stack}</Typography>
                    </Styled.Chip>
                  ))}
                </Styled.ChipList>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Styled.Root>
  )
}

export default ResumeProject
