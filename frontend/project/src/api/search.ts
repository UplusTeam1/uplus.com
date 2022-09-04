import Api from '../lib/customApi'

export async function autoCompletion(input: string) {
  const response = await Api.get<AutoCompletionList>(`/api/auto-completion`, {
    params: { input: input },
  })
  return response.data
}

export async function searchDevice(keyword: string) {
  const response = await Api.get<SearchDeviceList>(`/api/search`, {
    params: { keyword: keyword },
  })
  return response.data
}

export interface AutoCompletion {
  name: string
}

export interface AutoCompletionList extends Array<AutoCompletion> {}

export interface SearchDevice {
  code: string
  name: string
  brand: string
  price: number
  weeklySale: number
  picPaths: Array<string>
}

export interface SearchDeviceList extends Array<SearchDevice> {}
