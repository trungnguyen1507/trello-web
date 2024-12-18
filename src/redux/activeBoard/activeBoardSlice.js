import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '~/utils/axiosInstance'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'

// Khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk('activeBoard/fetchBoardDetailsAPI', async (boardId) => {
  const response = await axiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
})

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    // Lưu ý luôn luôn cần cặp ngoặc {} cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu vào reducer
      const board = action.payload

      // Xử lý dữ liệu nếu cần thiết...
      // ...

      // Update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    },

    updateCardInBoard: (state, action) => {
      // Update nested data
      const incomingCard = action.payload

      const column = state.currentActiveBoard.columns.find((column) => column._id === incomingCard.columnId)
      if (column) {
        const card = column.cards.find((card) => card._id === incomingCard._id)
        if (card) {
          Object.keys(incomingCard).forEach((key) => (card[key] = incomingCard[key]))
        }
      }
    }
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây là cái response.data trả về từ fetchBoardDetailsAPI
      let board = action.payload

      // Tự tạo thêm field FE_allUsers cho board phía FE để ghép 2 mảng owners và members trả về từ API
      board.FE_allUsers = board.owners.concat(board.members)

      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      // Xử lý trường hợp kéo card sang column rỗng
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      state.currentActiveBoard = board
    })
  }
})

// Actions: Là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const { updateCurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions

// Selectors: Là nơi dành cho các component bên dưới gọi bằng useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => state.activeBoard.currentActiveBoard

export const activeBoardReducer = activeBoardSlice.reducer
