import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

// Khởi tạo một đối tượng Axios (axiosInstance) mục đích để custom và cấu hình chung cho dự án.
let axiosInstance = axios.create()
// Thời gian chờ tối đa của 1 request: để 10 phút
axiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: Cho phép axios tự động gửi cookie trong mỗi request lên BE, phục vụ việc lưu JWT vào trong httpOnly Cookie
axiosInstance.defaults.withCredentials = true

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Kỹ thuật chặn spam click
    interceptorLoadingElements(false)

    // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
      // Dùng toastify để hiển thị mọi lỗi lên màn hình - Ngoại trừ mã 410 phục vụ việc refresh token
      if (error.response?.status !== 410) {
        toast.error(errorMessage)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
