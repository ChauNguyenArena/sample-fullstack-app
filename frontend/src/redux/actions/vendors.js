import VendorApi from '../../apis/vendor.js'
import slices from '../slices/index.js'

export const setVendors = async (dispatch, data) => {
  try {
    return dispatch(slices.vendors.actions.setData(data))
  } catch (error) {
    dispatch(slices.notify.actions.showNotify({ message: error.message, error: true }))
  }
}

export const getVendors = async (dispatch) => {
  try {
    let res = await VendorApi.getAll()
    if (!res.success) throw res.error

    return dispatch(slices.vendors.actions.setData(res.data))
  } catch (error) {
    dispatch(slices.notify.actions.showNotify({ message: error.message, error: true }))
  }
}
