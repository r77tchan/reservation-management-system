import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Default from './pages/Default'
import Top from './pages/Top'
import View from './pages/View'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Top</Link>
            </li>
            <li>
              <Link to="/view">View</Link>
            </li>
            <li>
              <Link to="/Register">register</Link>
            </li>
            <li>
              <Link to="/Login">login</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/default" element={<Default />} />
        <Route path="/" element={<Top />} />
        <Route path="/view" element={<View />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
