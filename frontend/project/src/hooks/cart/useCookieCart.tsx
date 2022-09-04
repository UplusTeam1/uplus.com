import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

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
  const navigate = useNavigate()

  const setCookieFunc = (cartData: CartData) => {
    const date = new Date()
    date.setDate(date.getDate() + 90)
    const name = String(date.valueOf() * Math.random())
    setCookie(
      name,
      { ...cartData, name: name, expires: date },
      { path: '/', expires: date }
    )
    Swal.fire({
      title: '장바구니 담기 완료!',
      text: '장바구니를 확인하시겠습니까?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result: any) => {
      if (result.isConfirmed) {
        navigate('/cart')
      }
    })
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

  return { cookies, setCookieFunc, getCookieFunc, removeCookieFunc }
}

export default useCookieCart
