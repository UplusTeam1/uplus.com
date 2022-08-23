import React from 'react'
import { Route, Routes } from 'react-router-dom'
// Styles
import './App.scss'
// Pages
import HeaderPage from './pages/HeaderPage'
import MainPage from './pages/main/MainPage'
import DeviceListPage from './pages/device/DeviceListPage'

function App() {
  return (
    <Routes>
      <Route path="/*" element={<HeaderPage />}>
        <Route path="" element={<MainPage />} />
        <Route path="device" element={<DeviceListPage />} />
      </Route>
    </Routes>
  )
}

export default App
