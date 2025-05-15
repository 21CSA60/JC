// This is a simple API service for making HTTP requests
// In a real app, this would connect to a backend server

const api = {
  defaults: {
    headers: {
      common: {},
    },
  },

  get: async (url) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: {} })
      }, 500)
    })
  },

  post: async (url, data) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: {} })
      }, 500)
    })
  },

  put: async (url, data) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: {} })
      }, 500)
    })
  },

  delete: async (url) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: {} })
      }, 500)
    })
  },
}

export default api
