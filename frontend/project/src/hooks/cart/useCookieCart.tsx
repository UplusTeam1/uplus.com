import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

function useCookieCart() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookieCart'])

  const setCookieFunc = (param: any) => {
    const date = new Date()
    date.setDate(date.getDay() + 90)
    setCookie('cookieCart', param, { expires: date })
  }

  const getCookieFunc = () => {
    return cookies.cookieCart
  }

  const removeCookieFunc = () => {
    removeCookie('cookieCart')
  }

  return { setCookieFunc, getCookieFunc, removeCookieFunc }
}

export default useCookieCart
