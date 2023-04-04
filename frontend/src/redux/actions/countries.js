import CountryApi from '../../apis/country.js'
import slices from '../slices/index.js'

export const setCountries = async (dispatch, data) => {
  try {
    return dispatch(slices.countries.actions.setData(data))
  } catch (error) {
    dispatch(slices.notify.actions.showNotify({ message: error.message, error: true }))
  }
}

export const getCountries = async (dispatch) => {
  try {
    let res = await CountryApi.getAll()
    if (!res.success) throw res.error

    return dispatch(slices.countries.actions.setData(res.data))
  } catch (error) {
    dispatch(slices.notify.actions.showNotify({ message: error.message, error: true }))
  }
}
