import React from 'react'

import { ResumeProfileData } from '@components/Resume/types'

import * as Styled from './ResumeProfile.styled'
import { Grid, Typography } from '@mui/material'

interface ResumeProfileProps {
  profile: ResumeProfileData
}

function ResumeProfile({ profile }: ResumeProfileProps) {
  const { email, github, name, phone, birthDate } = profile

  return (
    <Styled.Root>
      <Styled.ProfileImage
        src="/static/resume/profile.png"
        alt="프로필 사진"
        width={150}
        height={150}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <Typography variant="body1" fontWeight={600}>
            이름
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="body1">{name}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="body1" fontWeight={600}>
            생년월일
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="body1">{birthDate}</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="body1" fontWeight={600}>
            이메일
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="body1">
            <Styled.Link href={`mailto:${email}`}>{email}</Styled.Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="body1" fontWeight={600}>
            전화번호
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="body1">
            <Styled.Link href={`tel:${phone}`}>{phone}</Styled.Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography variant="body1" fontWeight={600}>
            깃허브
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="body1">
            <Styled.Link href={github}>{github}</Styled.Link>
          </Typography>
        </Grid>
      </Grid>
    </Styled.Root>
  )
}

export default ResumeProfile
