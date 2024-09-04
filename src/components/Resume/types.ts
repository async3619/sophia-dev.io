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

export interface ResumeTechStackGroup {
  title: string
  items: string[]
}

export interface ResumeExperienceProject {
  title: string
  contents: string[]
}

export interface ResumeExperienceData {
  title: string
  startDate: string
  endDate?: string
  position: string
  url: string
  projects: ResumeExperienceProject[]
}

export interface ResumeProjectData {
  title: string
  summary: string
  description: string[]
  stacks: string[]
  url: string
}

export interface ResumeData {
  profile: ResumeProfileData
  introduction: ResumeIntroductionData
  techStack: ResumeTechStackGroup[]
  experiences: ResumeExperienceData[]
  projects: ResumeProjectData[]
}
