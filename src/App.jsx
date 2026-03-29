
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Toast from './pages/Toast'
import ToastProvider from './provider/ToastProvider'
import InfiniteScroll from './pages/Infinite-scroll'
import MineIntersectionObserver from './pages/Intersection-Observer'
import PopoverRender from './pages/Popover'
import { PopoverProvider } from './provider/PopoverProvider'
import VirtualisedList from './pages/Virtualised-List'
import ReusableAutoComplete from './pages/ReusableAutoComplete'
import { Accordion } from './pages/Accordion'
import { Tabs } from './pages/Tabs'
import ReactMemo from './pages/ReactMemo'
import { Dialog } from './pages/Dialog'
import { DropDown } from './pages/Dropdown'



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
          <Route path="/virtualised-list" element={<VirtualisedList />} />
          <Route path='/autocomplete' element={<ReusableAutoComplete />} />
          <Route path='/accordion' element={<Accordion />} />
          <Route path='/tabs' element={<Tabs />} />
          <Route path='/react-memo' element={<ReactMemo />} />
           <Route path='/dialog' element={<Dialog />} />
            <Route path='/dropdown' element={<DropDown />} />
        </Routes>
      </ToastProvider>
    </PopoverProvider>
  )
}

export default App
