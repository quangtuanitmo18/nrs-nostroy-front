import axios from 'axios'
import appConfig from './app'

// Create an axios instance with default configuration
const http = axios.create({
  baseURL: appConfig.apiBaseUri,
  timeout: 30000, // timeout 30 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
})

// Request interceptor
http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
http.interceptors.response.use(
  response => {
    // Return data directly
    return response.data
  },
  error => {
    // Handle various errors
    const { response } = error

    // Handle 401 Unauthorized error
    if (response && response.status === 401) {
      // const authStore = useAuthStore();
      // authStore.logout();
      window.location.href = '/login'
    }

    // Return error for component to handle
    return Promise.reject(response?.data || 'An error occurred when connecting to server')
  }
)

// Utility methods
export const get = (url, params = {}, config = {}) => {
  return http.get(url, { params, ...config })
}

export const post = (url, data = {}, config = {}) => {
  return http.post(url, data, config)
}

export const put = (url, data = {}, config = {}) => {
  return http.put(url, data, config)
}

export const delele = (url, config = {}) => {
  return http.delete(url, config)
}

export const upload = (url, file, onUploadProgress) => {
  const formData = new FormData()
  formData.append('file', file)

  return http.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  })
}

export default http
