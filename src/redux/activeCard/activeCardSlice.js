import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentActiveCard: null
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,

  reducers: {
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },

    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload

      state.currentActiveCard = fullCard
    }
  },

  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => {}
})

export const { clearCurrentActiveCard, updateCurrentActiveCard } = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard

export const activeCardReducer = activeCardSlice.reducer
