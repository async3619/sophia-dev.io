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
import ResumeProject from '@components/Resume/ResumeProject'
import ResumePageBreak from '@components/Resume/ResumePageBreak'
import styled from '@emotion/styled'
import Image from 'next/image'

interface ResumePageProps {
  data: ResumeData
}

export const PrintOnly = styled.div`
  @media print {
    display: block;
  }

  @media screen {
    display: none;
  }
`

function ResumePage({ data }: ResumePageProps) {
  const { profile, introduction, techStack, experiences, projects } = data

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
      <PrintOnly>
        <Typography variant="body1" color="primary.main">
          해당 페이지의 내용은 아래 QR 코드를 스캔하시면 모바일 및
          데스크톱에서도 열람 가능합니다.
        </Typography>
        <Image
          alt="QR Code"
          src="/static/resume/qr.png"
          width={95}
          height={95}
        />
      </PrintOnly>
      <ResumePageBreak />
      <ResumeSection title="기술">
        <ResumeTechStack techStacks={techStack} />
      </ResumeSection>
      <ResumePageBreak />
      <ResumeSection title="경력">
        <ResumeExperience experiences={experiences} />
      </ResumeSection>
      <ResumePageBreak />
      <ResumeSection title="프로젝트">
        <ResumeProject projects={projects} />
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
