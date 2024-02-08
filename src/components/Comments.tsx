import Giscus from '@giscus/react'

import { Box } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'

import { getWebsiteBaseUrl } from '@utils/getWebsiteBaseUrl'

const baseUrl = getWebsiteBaseUrl(true)

export function Comments() {
  const { mode } = useColorScheme()

  return (
    <Box mt={8}>
      <Giscus
        id="comments"
        repo="async3619/sophia-dev.io"
        repoId="R_kgDOLKrNrA"
        category="General"
        categoryId="DIC_kwDOLKrNrM4CdEVh"
        mapping="title"
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme={`${baseUrl}/api/giscus-theme/${mode}`}
        lang="ko"
      />
    </Box>
  )
}
