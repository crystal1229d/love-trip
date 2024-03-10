import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TestPage from '@pages/Test'
import HotelListPage from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import SigninPage from '@pages/Signin'
import MyPage from '@pages/My'
import Navbar from '@components/shared/Navbar'

import AuthGuard from '@components/auth/AuthGuard'
import PrivateRoute from './components/auth/PrivateRoute'

import useLoadKakao from '@hooks/useLoadKakao'
import SettingsPage from '@pages/settings'
import LikePage from '@pages/settings/like'
import SchedulePage from '@pages/Schedule'
import ReservationPage from '@pages/Reservation'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path="/" element={<HotelListPage />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route
            path="/my"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/like"
            element={
              <PrivateRoute>
                <LikePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <SchedulePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservation"
            element={
              <PrivateRoute>
                <ReservationPage />
              </PrivateRoute>
            }
          />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
