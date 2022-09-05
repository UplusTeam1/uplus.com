import axios from 'axios'

const BASE_URL = 'http://my-lguplus.shop:8080'

const itemApi = axios.create({
  baseURL: BASE_URL,
})

export const orderApi = axios.create({
  baseURL: BASE_URL,
})

export const searchApi = axios.create({
  baseURL: BASE_URL,
})

export default itemApi
