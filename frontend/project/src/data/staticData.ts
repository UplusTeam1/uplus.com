interface CartDiscountTypeList {
  DEVICE_DISCOUNT: string
  PLAN_DISCOUNT_24: string
  PLAN_DISCOUNT_12: string
  NO_DISCOUNT: string
}

interface CartJoinTypeList {
  DEVICE_CHANGE: string
  NUMBER_TRANSFER: string
  NEW_SUBSCRIPTION: string
}

export const PLAN_INFO_LIST: Array<string> = [
  '요금',
  '데이터',
  '나눠쓰기',
  '음성통화',
  '메세지',
]

export const DISCOUNT_TYPE_LIST: Array<string> = [
  '추천',
  '공시지원금',
  '선택약정 24개월',
  '선택약정 12개월',
]

export const DICOUNT_INFO_LIST: Array<string> = [
  '',
  '휴대폰 가격 1회 할인',
  '24개월간 통신요금 25% 할인',
  '12개월간 통신요금 25% 할인',
]

export const INSTALLMENT_LIST: Array<string> = [
  '일시불',
  '12개월',
  '24개월',
  '36개월',
]

export const STORAGE_LIST: Array<string> = [
  '전체',
  '512GB 이상',
  '256GB',
  '128GB',
]

export const CART_DISCOUNT_TYPE_LIST: CartDiscountTypeList = {
  DEVICE_DISCOUNT: '공시지원금',
  PLAN_DISCOUNT_24: '선택약정 24개월',
  PLAN_DISCOUNT_12: '선택약정 12개월',
  NO_DISCOUNT: '',
}

export const CART_JOIN_TYPE_LIST: CartJoinTypeList = {
  DEVICE_CHANGE: '기기변경',
  NUMBER_TRANSFER: '번호이동',
  NEW_SUBSCRIPTION: '신규가입',
}
