import axios from 'axios'

const ITEM_BASE_URL = 'item.msa-myuplus:8080'
const ORDER_BASE_URL = 'order.msa-myuplus:8081'
const SEARCH_BASE_URL = 'search.msa-myuplus:8082'

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
