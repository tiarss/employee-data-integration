import axios from 'axios'
import { toast } from 'react-toastify'

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

    return response
  },
  (error) => {
    if (error.response) {
      const { status } = error.response

      switch (status) {
        case 209:
          toast.error('Multiple Choices')
          break
        case 400:
          toast.error('Bad Request')
          break
        case 401:
          toast.error('Unauthorized')
          break
        case 403:
          toast.error('Access forbidden')
          break
        case 404:
          toast.error('Resource not found')
          break
        case 409:
          toast.error('Conflict')
          break
        case 500:
          toast.error('Internal server error')
          break
        default:
          toast.error('An error occurred')
          break
      }
    } else if (error.request) {
      toast.error('Network Error')
    } else {
      toast.error('Error:' + error.message) 
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
