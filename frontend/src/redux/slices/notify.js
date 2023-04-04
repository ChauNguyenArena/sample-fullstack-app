import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    show: false,
    error: false,
    message: '',
    onDismiss: null,
  },
}

export default createSlice({
  name: 'notify',
  initialState,
  reducers: {
    showNotify: (state, action) => {
      state.data = { ...initialState.data, ...action.payload, show: true }
    },
    hideNotify: (state) => {
      state.data = initialState.data
    },
  },
})
