import axios from 'axios'

const apiCaller = async (endpoint, method = 'GET', data = undefined, extraHeaders = undefined) => {
  try {
    const res = await axios({
      url: process.env.REACT_APP_BACKEND_URL + '/api/' + endpoint,
      method: method || 'GET',
      data: data || undefined,
      headers: {
        // Authorization: `Bearer ${token}`,
        ...(extraHeaders ? extraHeaders : {}),
      },
    })

    return res.data
  } catch (error) {
    return {
      success: false,
      error: {
        message: error.response?.data?.error?.message || error.message,
        code: error.response?.data?.error?.code || undefined,
      },
    }
  }
}

export default apiCaller
