import { Typography } from '@mui/material'

export default function _404() {
  return (
    <div>
      <Typography
        variant="h6"
        textAlign="center"
        color="text.primary"
        gutterBottom
      >
        /404/
      </Typography>
      <Typography variant="body2" textAlign="center" color="text.secondary">
        Page Not Found
      </Typography>
    </div>
  )
}
