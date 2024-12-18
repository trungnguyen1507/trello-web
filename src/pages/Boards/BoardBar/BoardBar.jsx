import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip'
import { capitalizeFirstLetter } from '~/utils/formatters'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  paddingX: '5px',
  border: 'none',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip icon={<DashboardIcon />} label={board?.title} clickable sx={MENU_STYLES} />
        </Tooltip>
        <Chip icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable sx={MENU_STYLES} />
        <Chip icon={<AddToDriveIcon />} label='Add To Google Drive' clickable sx={MENU_STYLES} />
        <Chip icon={<BoltIcon />} label='Automation' clickable sx={MENU_STYLES} />
        <Chip icon={<FilterListIcon />} label='Filters' clickable sx={MENU_STYLES} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <InviteBoardUser boardId={board._id} />

        <BoardUserGroup boardUsers={board?.FE_allUsers} />
      </Box>
    </Box>
  )
}

export default BoardBar
