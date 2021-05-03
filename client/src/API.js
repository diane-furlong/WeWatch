import axios from "axios"

const API = axios.create({ baseURL: 'http://localhost:3000' })

export const login = (formData) => API.post('/users/login', formData)
export const signup = (formData) => API.post('/users/signup', formData)