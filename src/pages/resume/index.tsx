import React from 'react'
import { GetStaticProps } from 'next'
import fs from 'fs/promises'
import path from 'path'

import ResumeSection from '@components/Resume/ResumeSection'
import ResumeProfile from '@components/Resume/ResumeProfile'
import { Title } from '@components/Title'
import { ResumeData } from '@components/Resume/types'
import { Typography } from '@mui/material'
import ResumeTechStack from '@components/Resume/ResumeTechStack'
import ResumeExperience from '@components/Resume/ResumeExperience'

interface ResumePageProps {
  data: ResumeData
}

function ResumePage({ data }: ResumePageProps) {
  const { profile, introduction, techStack, experiences } = data

  return (
    <>
      <ResumeSection>
        <Title>이력서 📄</Title>
        <ResumeProfile profile={profile} />
      </ResumeSection>
      <ResumeSection title="소개">
        {introduction.contents.map((content, index) => (
          <Typography key={index} variant="body1" mb="1em">
            {content}
          </Typography>
        ))}
      </ResumeSection>
      <ResumeSection title="기술">
        <ResumeTechStack techStacks={techStack} />
      </ResumeSection>
      <ResumeSection title="경력">
        <ResumeExperience experiences={experiences} />
      </ResumeSection>
    </>
  )
}

export const getStaticProps: GetStaticProps<ResumePageProps> = async () => {
  const targetDirectory = path.join(process.cwd(), 'content', 'resume')
  const fullPath = path.join(targetDirectory, `resume.json`)
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const data = JSON.parse(fileContents) as ResumeData

  return {
    props: {
      data,
    },
  }
}

export default ResumePage
