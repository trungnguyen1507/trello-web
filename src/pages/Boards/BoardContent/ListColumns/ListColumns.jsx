import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  /**
   * Thằng SortableContext yêu cầu items là một mảng dạng ['id-1', 'id-2'] chứ không phải [{id: 'id-1'},
   {id: 'id-2'}]
   * Nếu không đúng thì vẫn kéo thả được nhưng không có animation
   * https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
   */
  return (
    <SortableContext items={columns.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        {/* Box Column 01 */}
        {columns.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        {/* Box Add new column */}
        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            bgcolor: '#ffffff3d',
            borderRadius: '6px',
            height: 'fit-content'
          }}
        >
          <Button
            startIcon={<NoteAddIcon />}
            sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
