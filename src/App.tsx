import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TestPage from '@pages/Test'
import HotelListPage from '@pages/HotelList'
import HotelPage from '@pages/Hotel'
import useLoadKakao from './hooks/useLoadKakao'
import SigninPage from './pages/Signin'
import MyPage from './pages/My'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelListPage />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
