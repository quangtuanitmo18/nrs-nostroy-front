import axios from 'axios'

// Create an axios instance with default configuration
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URI,
  timeout: 30000, // timeout 30 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor
http.interceptors.request.use(
  config => {
    // Get token from store or localStorage
    // const authStore = useAuthStore();
    // const token = authStore.token || localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NzE5MmZmNC0xMWFjLTQyMWYtYjE0Ni1mNWNhYTU1OTkyZTciLCJ1c2VyIjp7ImlzQWN0aXZlIjp0cnVlLCJpZCI6IjQ3MTkyZmY0LTExYWMtNDIxZi1iMTQ2LWY1Y2FhNTU5OTJlNyIsImNyZWF0ZWREYXRlIjoiMjAyNS0wNS0xMFQxMzoxMzowNy4xNjFaIiwidXBkYXRlZERhdGUiOiIyMDI1LTA1LTE3VDIxOjI3OjA2Ljc5M1oiLCJkZWxldGVkQXQiOm51bGwsInVzZXJOYW1lIjoiYWRtaW4iLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQG9rdmlwLmNvbSIsImlzQWRtaW4iOnRydWUsImdlbmRlciI6Im1hbGUiLCJkb2IiOiIyMDI1LTEwLTA0IiwiY3JlYXRlZEJ5SWQiOm51bGwsInBlcm1pc3Npb25zIjp7fSwidGVhbUlkIjpudWxsLCJ0ZWFtIjpudWxsLCJ1c2VyTG9ja291dCI6eyJpc0FjdGl2ZSI6dHJ1ZSwiaWQiOiJjNWM0YTQzNy1hYzE4LTQ0NTMtOWRhNC0zOTJjZGVjN2ZhOTkiLCJjcmVhdGVkRGF0ZSI6IjIwMjUtMDUtMTJUMTY6MjU6MjAuOTM5WiIsInVwZGF0ZWREYXRlIjoiMjAyNS0wNS0xMlQxNjoyNToyMC45MzlaIiwiZGVsZXRlZEF0IjpudWxsLCJ1c2VySWQiOiI0NzE5MmZmNC0xMWFjLTQyMWYtYjE0Ni1mNWNhYTU1OTkyZTciLCJmYWlsZWRMb2dpbkF0dGVtcHRzIjowLCJsb2Nrb3V0VW50aWwiOm51bGwsImxhc3RGYWlsZWRMb2dpbiI6bnVsbH19LCJpYXQiOjE3NDg4OTE5MjIsImV4cCI6MTc0OTQ5NjcyMn0.2Wjlq8VrQi2Az698B0WGz107Lar2HV63_q4vSOcvF-8'

    // Add token to headers if available
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

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
    return Promise.reject(response?.data?.message || 'An error occurred when connecting to server')
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

export const del = (url, config = {}) => {
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
