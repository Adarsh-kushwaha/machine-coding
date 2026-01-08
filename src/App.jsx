
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MultiForm from './pages/MultiForm'
import Home from './pages/Home'
import OtpInput from './pages/OtpInput'
import NestedCheckbox from './pages/NestedCheckbox'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multi-form" element={<MultiForm />} />
        <Route path="/otp" element ={<OtpInput/>}/>
        <Route path="/nested-checkbox" element ={<NestedCheckbox/>}/>
      </Routes>
    </>
  )
}

export default App
