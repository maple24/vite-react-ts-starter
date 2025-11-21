import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Users from '../pages/Users'
import Profile from '../pages/Profile'
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
      { path: 'users', element: <Users /> },
      { path: 'profile', element: <Profile /> },
      { path: 'about', element: <About /> },
      { path: 'features', element: <Features /> },
    ],
  },
])
