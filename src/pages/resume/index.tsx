import React from 'react'
import { GetStaticProps } from 'next'
import fs from 'fs/promises'
import path from 'path'

import ResumeSection from '@components/Resume/ResumeSection'
import ResumeProfile from '@components/Resume/ResumeProfile'
import { Title } from '@components/Title'
import { ResumeData } from '@components/Resume/types'

interface ResumePageProps {
  data: ResumeData
}

function ResumePage({ data }: ResumePageProps) {
  return (
    <>
      <ResumeSection>
        <Title>이력서 📄</Title>
        <ResumeProfile profile={data.profile} />
      </ResumeSection>
      <ResumeSection title="소개"></ResumeSection>
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
