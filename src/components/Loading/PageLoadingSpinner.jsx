import { Box, CircularProgress, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'

function PageLoadingSpinner({ caption }) {
  return (
    <>
      <AppBar />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: '100vw',
          height: '100vh'
        }}
      >
        <CircularProgress />
        <Typography>{caption}</Typography>
      </Box>
    </>
  )
}

export default PageLoadingSpinner
