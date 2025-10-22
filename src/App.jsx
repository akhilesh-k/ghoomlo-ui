import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import About from './pages/About'
import Home from './pages/Home'
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" element={<About />} />
        <Route path="/:slug" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
