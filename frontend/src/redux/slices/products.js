import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {
    products: null,
    created: null,
  },
}

export default createSlice({
  name: 'products',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
  },
})
