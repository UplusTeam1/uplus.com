import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { PlanListData, getPlanList } from '../../api/plan'

function usePlanList() {
  const result = useQuery<PlanListData, AxiosError>('planList', getPlanList)
  return result
}

export default usePlanList
