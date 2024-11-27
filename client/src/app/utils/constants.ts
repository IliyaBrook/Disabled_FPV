export const isDev = process.env.NODE_ENV === 'development'
export const apiUrl = isDev ? 'http://localhost:5000' : ''
