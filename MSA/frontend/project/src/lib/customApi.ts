import axios from 'axios'

const ITEM_BASE_URL = ''
const ORDER_BASE_URL = ''
const SEARCH_BASE_URL = ''

axios.defaults.withCredentials = true

const itemApi = axios.create({
  baseURL: ITEM_BASE_URL,
})

export const orderApi = axios.create({
  baseURL: ORDER_BASE_URL,
})

export const searchApi = axios.create({
  baseURL: SEARCH_BASE_URL,
})

export default itemApi
