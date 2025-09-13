import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from './Tabs/Modal'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import { Home } from './Tabs/Home'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/homepage" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
