import slices from './../slices/index.js'

export const showAppLoading = (dispatch, data) => {
  return data
    ? dispatch(slices.appLoading.actions.setData(data))
    : dispatch(slices.appLoading.actions.showAppLoading())
}

export const hideAppLoading = (dispatch) => {
  dispatch(slices.appLoading.actions.hideAppLoading())
}
