import React from 'react'

import { ResumeExperienceData } from '@components/Resume/types'

import * as Styled from './ResumeExperience.styled'
import { Grid, Typography } from '@mui/material'
import ResumePageBreak from './ResumePageBreak'

interface ResumeExperienceProps {
  experiences: ResumeExperienceData[]
}

function ResumeExperience({ experiences }: ResumeExperienceProps) {
  return (
    <Styled.Root>
      <Grid container spacing={2}>
        {experiences.map((experience, index) => {
          return (
            <>
              <Grid item key={index} xs={12} mb={1}>
                <Typography variant="body2" color="text.secondary" mb="0.5em">
                  {experience.startDate} ~ {experience.endDate ?? '현재'}
                </Typography>
                <Typography>
                  <Styled.Link target="_blank" href={experience.url}>
                    <Typography
                      component="span"
                      variant="body1"
                      fontWeight={600}
                      display="inline-block"
                      mr={1}
                    >
                      {experience.title}
                    </Typography>
                  </Styled.Link>
                  <Typography
                    component="span"
                    variant="body2"
                    color="primary.dark"
                    display="inline-block"
                  >
                    {experience.position}
                  </Typography>
                </Typography>
                <Styled.DescriptionList>
                  {experience.projects.map((project) => (
                    <Typography component="li" key={project.title}>
                      <Typography component="span" fontWeight="bold">
                        {project.title}
                      </Typography>
                      <Styled.DescriptionList>
                        {project.contents.map((content, index) => (
                          <Typography
                            component="li"
                            variant="body1"
                            key={index}
                            mb="1em"
                          >
                            {content}
                          </Typography>
                        ))}
                      </Styled.DescriptionList>
                    </Typography>
                  ))}
                </Styled.DescriptionList>
              </Grid>
              {!!index && index % 2 === 0 && <ResumePageBreak />}
            </>
          )
        })}
      </Grid>
    </Styled.Root>
  )
}

export default ResumeExperience
