import React from 'react'
import { Route, Routes } from 'react-router-dom'
// Styles
import './App.scss'
// Pages
import HeaderPage from './pages/HeaderPage'
import MainPage from './pages/main/MainPage'
import DeviceListPage from './pages/device/DeviceListPage'
import DeviceDetailPage from './pages/device/DeviceDetailPage'
import OrderListPage from './pages/order/OrderListPage'

function App() {
  return (
    <Routes>
      <Route path="/*" element={<HeaderPage />}>
        <Route path="" element={<MainPage />} />
        <Route path="device" element={<DeviceListPage />} />
        <Route path="device/:deviceCode" element={<DeviceDetailPage />} />
        <Route path="order" element={<OrderListPage />} />
      </Route>
    </Routes>
  )
}

export default App
