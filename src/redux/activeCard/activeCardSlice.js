import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,

  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },

    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
      state.isShowModalActiveCard = false
    },

    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload

      state.currentActiveCard = fullCard
    }
  },

  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {}
})

export const { clearCurrentActiveCard, updateCurrentActiveCard, showModalActiveCard } = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard

export const selectIsShowModalActiveCard = (state) => state.activeCard.isShowModalActiveCard

export const activeCardReducer = activeCardSlice.reducer
