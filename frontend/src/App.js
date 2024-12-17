import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Default from './pages/Default'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/default" element={<Default />} />
      </Routes>
    </Router>
  )
}

export default App
