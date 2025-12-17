
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MultiForm from './pages/MultiForm'
import Home from './pages/Home'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/multi-form" element={<MultiForm />} />
      </Routes>
    </>
  )
}

export default App
