import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Default from './pages/Default'
import Top from './pages/Top'
import View from './pages/View'
import Create from './pages/Create'
import Auth from './pages/Auth'

const routeConfig = [
  { path: '/default', element: <Default /> },
  { path: '/', element: <Top />, isPrivate: true },
  { path: '/view', element: <View /> },
  { path: '/create', element: <Create /> },
  { path: '/auth', element: <Auth /> },
]

function App() {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">/</Link>
            </li>
            <li>
              <Link to="/view">/view</Link>
            </li>
            <li>
              <Link to="/create">/create</Link>
            </li>
            <li>
              <Link to="/auth">/auth</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        {routeConfig.map(({ path, element, isPrivate }) =>
          isPrivate ? (
            <Route
              key={path}
              path={path}
              element={<PrivateRoute>{element}</PrivateRoute>}
            />
          ) : (
            <Route key={path} path={path} element={element} />
          )
        )}
      </Routes>
    </Router>
  )
}

export default App
