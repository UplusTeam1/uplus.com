import { useCookies } from 'react-cookie'

export interface CartData {
  name: string
  expires: Date | null
  deviceCode: string
  deviceName: string
  joinTypeIndex: number
  installmentIndex: number
  discountIndex: number
  planName: string
  picPath: string
  color: string
  storage: number
}

export interface CartDataList extends Array<CartData> {}

function useCookieCart() {
  const [cookies, setCookie, removeCookie] = useCookies()

  const setCookieFunc = (cartData: CartData) => {
    const date = new Date()
    date.setDate(date.getDate() + 90)
    const name = String(date.valueOf() * Math.random())
    setCookie(
      name,
      { ...cartData, name: name, expires: date },
      { path: '/', expires: date }
    )
  }

  const getCookieFunc = () => {
    const allCookies: CartDataList = Object.keys(cookies).map((key: string) => {
      return cookies[key]
    })
    return allCookies
  }

  const removeCookieFunc = (cartData: CartData) => {
    removeCookie(cartData.name)
  }

  return { setCookieFunc, getCookieFunc, removeCookieFunc }
}

export default useCookieCart
