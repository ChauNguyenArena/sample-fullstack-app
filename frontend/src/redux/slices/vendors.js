import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
}

export default createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
  },
})
