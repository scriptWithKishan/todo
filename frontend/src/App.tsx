import { Routes, Route } from 'react-router'
import Home from './components/home'
import NotFound from './components/not-found'
import Auth from './components/auth'
import ProtectedRoute from './components/protected-route'


function App() {

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth" element={<Auth />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Default Route: Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
