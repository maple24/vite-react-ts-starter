import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'
import About from '../pages/About'
import Login from '../pages/Login'
import Features from '../pages/Features'
import ProtectedRoute from '../components/common/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'profile', element: <Profile /> },
      { path: 'settings', element: <Settings /> },
      { path: 'about', element: <About /> },
      { path: 'features', element: <Features /> },
    ],
  },
])
