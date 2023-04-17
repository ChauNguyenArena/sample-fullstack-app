import apiCaller from '../helpers/apiCaller.js'

const UploadApi = {
  getFile: async (name) => await apiCaller(`uploads/${name}`),
  uploadFiles: async (files) => {
    const data = new FormData()
    data.append('files', files)
    const res = await apiCaller(`uploads`, 'POST', data, { 'Content-Type': 'multipart/form-data' })
    return res
  },
}

export default UploadApi
