export interface DiscountType {
  label: string
  indexValue: number
}

export interface InstallmentType {
  label: string
  indexValue: number
}

export interface StorageType {
  label: string
  value: number
}

export interface MakerType {
  label: string
  value: string
}

export interface StorageInfoType {
  [key: number]: string
  512: string
  256: string
  128: string
}

export interface JoinType {
  label: string
  indexValue: number
  info: string
  value: string
}

export interface CartDiscountTypeList {
  DEVICE_DISCOUNT: string
  PLAN_DISCOUNT_24: string
  PLAN_DISCOUNT_12: string
  NO_DISCOUNT: string
}

export interface CartJoinTypeList {
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

export const DISCOUNT_TYPE_LIST: Array<DiscountType> = [
  { label: '추천', indexValue: -1 },
  { label: '공시지원금', indexValue: 0 },
  { label: '선택약정 24개월', indexValue: 1 },
  { label: '선택약정 12개월', indexValue: 2 },
]

export const DICOUNT_INFO_LIST: Array<string> = [
  '',
  '휴대폰 가격 1회 할인',
  '24개월간 통신요금 25% 할인',
  '12개월간 통신요금 25% 할인',
]

export const INSTALLMENT_LIST: Array<InstallmentType> = [
  { label: '일시불', indexValue: -1 },
  { label: '12개월', indexValue: 0 },
  { label: '24개월', indexValue: 1 },
  { label: '36개월', indexValue: 2 },
]

export const STORAGE_LIST: Array<StorageType> = [
  { label: '전체', value: 0 },
  { label: '512GB 이상', value: 512 },
  { label: '256GB', value: 256 },
  { label: '128GB', value: 128 },
]

export const MAKER_LIST: Array<MakerType> = [
  { label: '전체', value: '' },
  { label: '삼성', value: 'samsung' },
  { label: '애플', value: 'apple' },
]

export const STORAGE_INFO: StorageInfoType = {
  512: '사진은 102,400장, 영화는 약 640편을 저장할 수 있어요.',
  256: '사진은 약 51,200장, 영화는 약 320편을 저장할 수 있어요.',
  128: '사진은 약 25,600장, 영화는 약 160편을 저장할 수 있어요.',
}

export const JOIN_TYPE_LIST: Array<JoinType> = [
  {
    label: '기기변경',
    indexValue: 0,
    info: '이용 중인 U⁺ 번호 그대로 휴대폰만 바꾸고 싶어요.',
    value: 'DEVICE_CHANGE',
  },
  {
    label: '번호이동',
    indexValue: 1,
    info: '쓰던 번호 그대로, 통신사만 U⁺로 바꾸고 싶어요.',
    value: 'NUMBER_TRANSFER',
  },
  {
    label: '신규가입',
    indexValue: 2,
    info: '새로운 번호로 U⁺에 가입하고 싶어요.',
    value: 'NEW_SUBSCRIPTION',
  },
]

export const DISCOUNT_VALUE_LIST: Array<string> = [
  'DEVICE_DISCOUNT',
  'PLAN_DISCOUNT_24',
  'PLAN_DISCOUNT_12',
  'NO_DISCOUNT',
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
