import apiCaller from '../helpers/apiCaller.js'

const UploadApi = {
  getFile: async (name) => await apiCaller(`uploads/${name}`),
  uploadFiles: async (files) => {
    console.log(files)
    const data = new FormData()
    files?.forEach((file) => data.append('files', file))

    const res = await apiCaller(`uploads`, 'POST', data, { 'Content-Type': 'multipart/form-data' })
    return res
  },
}

export default UploadApi
