export interface ResumeProfileData {
  name: string
  birthDate: string
  email: string
  phone: string
  github: string
}

export interface ResumeIntroductionData {
  contents: string[]
}

export interface ResumeData {
  profile: ResumeProfileData
  introduction: ResumeIntroductionData
}
