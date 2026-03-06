
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Toast from './pages/Toast'
import ToastProvider from './provider/ToastProvider'
import InfiniteScroll from './pages/Infinite-scroll'
import MineIntersectionObserver from './pages/Intersection-Observer'


function App() {

  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toast" element={<Toast />} />
        <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        <Route path="/intersection-observer" element={<MineIntersectionObserver />} />
      </Routes>
    </ToastProvider>
  )
}

export default App
