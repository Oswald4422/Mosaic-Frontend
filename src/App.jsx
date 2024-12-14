import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'

// Layout Components
import Header from './components/Header'

// Page Components
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import CreateEvent from './pages/CreateEvent'
import Profile from './pages/Profile'
import AdminEvents from './pages/AdminEvents'

// Route Protection Components
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-1 w-full flex flex-col overflow-hidden">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <AdminEvents />
              </AdminRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <AdminRoute>
                <CreateEvent />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/events/create"
            element={
              <AdminRoute>
                <CreateEvent />
              </AdminRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
