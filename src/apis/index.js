import { toast } from 'react-toastify'
import axiosInstance from '~/utils/axiosInstance'
import { API_ROOT } from '~/utils/constants'

// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return response.data
// }

export const updateBoardDetailAPI = async (boardId, updateData) => {
  const response = await axiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}

export const createNewColumnAPI = async (newColumnData) => {
  const response = await axiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailAPI = async (columnId, updateData) => {
  const response = await axiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColumnDetailAPI = async (columnId) => {
  const response = await axiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

export const createNewCardAPI = async (newCardData) => {
  const response = await axiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}

// Users
export const registerUserApi = async (data) => {
  const response = await axiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  toast.success('Account created successfully! Please check and verify your account before logging in!')
  return response.data
}

export const verifyUserApi = async (data) => {
  const response = await axiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Account verified successfully! Now you can login to enjoy our services! Have a good day!')
  return response.data
}
