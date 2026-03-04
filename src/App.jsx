
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Toast from './pages/Toast'
import ToastProvider from './provider/ToastProvider'


function App() {

  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toast" element={<Toast />} />
      </Routes>
    </ToastProvider>
  )
}

export default App
