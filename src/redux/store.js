import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

// Cấu hình Persist
const rootPersistConfig = {
  key: 'root', // key của persist do chúng ta chỉ định, để mặc định là root
  storage: storage, // biến storage - mặc định lưu vào localStorage
  whitelist: ['user'] // được nghĩa các slice dữ liệu ĐƯỢC PHÉP duy trì qua mỗi lần F5
  // blacklist: ['user'] // được nghĩa các slice dữ liệu KHÔNG ĐƯỢC PHÉP duy trì qua mỗi lần F5
}

// Combine các reducers
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

// Thực hiện persist Reducers
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  // Fix warning error redux-persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
