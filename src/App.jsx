
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Toast from './pages/Toast'
import ToastProvider from './provider/ToastProvider'
import InfiniteScroll from './pages/Infinite-scroll'
import MineIntersectionObserver from './pages/Intersection-Observer'
import PopoverRender from './pages/Popover'
import { PopoverProvider } from './provider/PopoverProvider'



function App() {

  return (
    <PopoverProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toast" element={<Toast />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/intersection-observer" element={<MineIntersectionObserver />} />
          <Route path="/popover" element={<PopoverRender />} />
        </Routes>
      </ToastProvider>
    </PopoverProvider>
  )
}

export default App
