import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '~/utils/axiosInstance'
import { API_ROOT } from '~/utils/constants'

// Khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentNotifications: null
}

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const fetchInvitationsAPI = createAsyncThunk('notifications/fetchInvitationsAPI', async () => {
  const response = await axiosInstance.get(`${API_ROOT}/v1/invitations`)
  return response.data
})

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await axiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },

    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotification: (state, action) => {
      const incomingInvitation = action.payload
      // unshift là thêm phần tử vào đầu mảng
      state.currentNotifications.unshift(incomingInvitation)
    }
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload

      state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload

      const getInvitation = state.currentNotifications.find((item) => item._id === incomingInvitation._id)
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

// Actions: Là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const { clearCurrentNotifications, updateCurrentNotifications, addNotification } = notificationsSlice.actions

// Selectors: Là nơi dành cho các component bên dưới gọi bằng useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentNotifications = (state) => state.notifications.currentNotifications

export const notificationsReducer = notificationsSlice.reducer
