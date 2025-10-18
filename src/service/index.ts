import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Signature': 'fairatmos-'+import.meta.env.VITE_API_SIGNATURE || '1234567890',
  },
})

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url)

    return response
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      console.error('Response Error:', status, data)

      switch (status) {
        case 401:
          
          break
        case 403:
          console.error('Access forbidden')
          break
        case 404:
          console.error('Resource not found')
          break
        case 500:
          console.error('Internal server error')
          break
        default:
          console.error('An error occurred')
      }
    } else if (error.request) {
      console.error('Network Error:', error.request)
    } else {
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
