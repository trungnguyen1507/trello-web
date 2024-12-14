import { Box, CircularProgress, Typography } from '@mui/material'

function PageLoadingSpinner({ caption, width, height }) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          width: width,
          height: height
        }}
      >
        <CircularProgress />
        <Typography>{caption}</Typography>
      </Box>
    </>
  )
}

export default PageLoadingSpinner
