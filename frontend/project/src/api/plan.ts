import Api from '../lib/customApi'

// api
export async function getPlanList() {
  const response = await Api.get(`api/plan`)
  console.log(response)
  console.log(response.data)
  return response.data
}

// interface
export interface PlanData {
  id: number
  name: string
  data: string
  sharing: string
  voiceCall: string
  message: string
  price: number
}

export interface PlanListData extends Array<PlanData> {}
