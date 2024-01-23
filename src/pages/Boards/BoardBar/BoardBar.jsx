import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

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
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': {
                bgcolor: '#a4b0be'
              }
            }
          }}
        >
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-53-.7994.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-50-.9047.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-52-.7933.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-50-.6566.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-53-.2950.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-53-.5548.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-53-.7994.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-50-.9047.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-52-.7933.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-50-.6566.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-53-.2950.jpg'
            />
          </Tooltip>
          <Tooltip title='HinaChan'>
            <Avatar
              alt='HinaChan'
              src='https://motgame.vn/stores/news_dataimages/motgamevn/062023/30/05/hina-nu-cosplayer-noi-tieng-han-quoc-khien-bao-nguoi-me-met-nhan-lam-vo-la-ai-53-.5548.jpg'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
