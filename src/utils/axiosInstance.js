import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '~/apis'
import { history } from '~/helpers'
import { path } from './constants'

// Không thể import { store } from '~/redux/store' theo cách thông thường ở đây
// Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component
// Hiểu đơn giản, khi code chạy lên, code chạy vào main.jsx đầu tiên, chúng ta gọi hàm injectStore để gán biến mainStore vào axiosReduxStore
let axiosReduxStore
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

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

let refreshTokenPromise = null

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

    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }

    const originalRequest = error?.config
    if (error?.response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            return data?.accessToken
          })
          .catch((_error) => {
            axiosReduxStore.dispatch(logoutUserAPI(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        // Nếu lưu accessToken vào localStorage thì xử lý tiếp ở đây
        return axiosInstance(originalRequest)
      })
    }

    // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
      // Dùng toastify để hiển thị mọi lỗi lên màn hình - Ngoại trừ mã 410 phục vụ việc refresh token
      if (error.response?.status !== 410) {
        toast.error(errorMessage)
        if (errorMessage.includes('Your account is already active!')) {
          history.navigate(path.login)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
