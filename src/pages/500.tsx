import { Typography } from '@mui/material'

export default function _500() {
  return (
    <div>
      <Typography
        variant="h6"
        textAlign="center"
        color="text.primary"
        gutterBottom
      >
        /500/
      </Typography>
      <Typography variant="body2" textAlign="center" color="text.secondary">
        Internal Server Error
      </Typography>
    </div>
  )
}
