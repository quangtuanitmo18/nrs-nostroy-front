const appConfig = {
  apiBaseUri: import.meta.env.DEV ? '/api/' : import.meta.env.VITE_API_BASE_URI,
  rowPageTable: 30,
}

export default appConfig
