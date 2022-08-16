import router from '@/router'

export const home = () => router.replace('/')
export const unauthorized = () => router.replace('/401')
export const pageNotFound = () => router.replace('/404')
export const serverError = () => router.replace('/500')
export const login = () => router.replace('/login')
