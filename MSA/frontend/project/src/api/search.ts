import { searchApi } from '../lib/customApi'
import { DeviceData } from './device'

export async function autoCompletion(input: string) {
  const response = await searchApi.get<AutoCompletionList>(
    `/api/auto-completion`,
    {
      params: { input: input },
    }
  )
  return response.data
}

export async function searchDevice(keyword: string) {
  const response = await searchApi.get<SearchDeviceList>(`/api/search`, {
    params: { keyword: keyword },
  })
  return response.data
}

export interface AutoCompletion {
  name: string
}

export interface AutoCompletionList extends Array<AutoCompletion> {}

export interface SearchDevice extends DeviceData {
  planCharge: number
}

export interface SearchDeviceList extends Array<SearchDevice> {}
