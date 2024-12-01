export const isDev = process.env.NODE_ENV === 'development'
export const apiUrl = isDev ? 'http://localhost:5000' : ''
export const defaultEmail = isDev ? process.env.NEXT_PUBLIC_DEFAULT_EMAIL : ''
export const defaultPassword = isDev ? process.env.NEXT_PUBLIC_DEFAULT_PASS : ''
