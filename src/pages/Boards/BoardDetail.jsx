import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect } from 'react'
import { updateBoardDetailAPI, updateColumnDetailAPI, moveCardToDifferentColumnAPI } from '~/apis'
import { isEmpty, cloneDeep } from 'lodash'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function Board() {
  const dispatch = useDispatch()
  // Không dùng state của component nữa mà chuyển sang dùng state của Redux
  //const [board, setBoard] = useState([])
  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()

  useEffect(() => {
    // const boardId = '65af25940fb19081d2cd07b5'
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  // Đoạn này đã chuyển logic vào trong ListColumns
  // const createNewColumn = async (newColumnData) => {}

  // Đoạn này đã chuyển logic vào trong Column
  // const createNewCard = async (newCardData) => {}

  // Đoạn này đã chuyển logic vào trong Column
  // const deleteColumnDetails = (columnId) => {}

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

    /**
     * Trường hợp này dùng Spread Operator không sao bởi vì ở đây không dùng push làm thay đổi trực tiếp kiểu mở rộng mảng, mà gán lại toàn bộ giá trị bằng 2 mảng mới
     */
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Gọi API Update board
    updateBoardDetailAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Tương tự createNewColumn, chỗ này dùng cloneDeep()
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find((column) => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    updateColumnDetailAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * Khi kéo card sang column khác
   * B1: Cập nhật mảng cardOrderIds của column ban đầu chứa nó (xoá cái _id của card ra khỏi mảng)
   * B2: Cập nhật mảng cardOrderIds của column tiếp theo (thêm _id của card vào mảng)
   * B3: Cập nhật lại trường columnId của card đã kéo
   */
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

    // Tương tự moveColumns bên trên, không ảnh hường đến Redux Immutability
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    let prevCardOrderIds = dndOrderedColumns.find((c) => c._id === prevColumnId)?.cardOrderIds
    // Khi kéo card cuối ra khỏi Column sẽ có placeholder card, cần xoá nó đi trước khi gửi cho BE
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if (isEmpty(board) || board._id !== boardId) {
    return <PageLoadingSpinner caption='Loading Board...' width='100vw' height='100vh' />
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board
