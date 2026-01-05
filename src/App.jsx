
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MultiForm from './pages/MultiForm'
import Home from './pages/Home'
import OtpInput from './pages/OtpInput'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multi-form" element={<MultiForm />} />
        <Route path="/otp" element ={<OtpInput/>}/>
      </Routes>
    </>
  )
}

export default App
