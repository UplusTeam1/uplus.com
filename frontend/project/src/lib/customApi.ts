import axios from 'axios'

const ITEM_BASE_URL = 'item.msa-myuplus.in:8080'
const ORDER_BASE_URL = 'order.msa-myuplus.in:8081'
const SEARCH_BASE_URL = 'search.msa-myuplus.in:8082'

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
