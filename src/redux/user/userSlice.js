import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axiosInstance from '~/utils/axiosInstance'
import { API_ROOT } from '~/utils/constants'
import { pickUser } from '~/utils/formatters'

// Khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentUser: null
}

// Các hành động gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const loginUserAPI = createAsyncThunk('user/loginUserAPI', async (data) => {
  const response = await axiosInstance.post(`${API_ROOT}/v1/users/login`, data)
  toast.success('Login successfully! Have a good day!')
  return response.data
})

export const logoutUserAPI = createAsyncThunk('user/logoutUserAPI', async (showSuccessMessage = true) => {
  const response = await axiosInstance.delete(`${API_ROOT}/v1/users/logout`)
  if (showSuccessMessage) {
    toast.success('Logout successfully!')
  }
  return response.data
})

export const updateUserAPI = createAsyncThunk('user/updateUserAPI', async (data) => {
  const response = await axiosInstance.put(`${API_ROOT}/v1/users/update`, data)
  return response.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {},
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = pickUser(action.payload)

      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      // API logout gọi thành công thì sẽ clear thông tin user trong redux
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
  }
})

// Actions: Là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// export const {} = userSlice.actions

// Selectors: Là nơi dành cho các component bên dưới gọi bằng useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentUser = (state) => state.user.currentUser

export const userReducer = userSlice.reducer
