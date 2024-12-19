import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout' // ヘッダー付きレイアウト
import Default from './pages/Default'
import Top from './pages/Top'
import View from './pages/View'
import Create from './pages/Create'
import Auth from './pages/Auth'

function App() {
  return (
    <Router>
      <Routes>
        {/* プライベートルート */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Top />} />
            <Route path="/view" element={<View />} />
            <Route path="/create" element={<Create />} />
          </Route>
        </Route>

        {/* パブリックルート */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/default" element={<Default />} />
      </Routes>
    </Router>
  )
}

export default App
