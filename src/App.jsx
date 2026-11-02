import { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import './App.css'

function App() {
  const [page, setPage] = useState('home')

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || null
  })

  function handleLogin(user) {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  function handleLogout() {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    setPage('home')
  }

  return (
    <div className="app">
      <header>
        <h1>LibraX</h1>
        <p>Online Library Management System</p>
      </header>

      <main>
        {currentUser ? (
          <>
            <h2>Welcome, {currentUser.name}</h2>

            {currentUser.role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <UserDashboard currentUser={currentUser} />
            )}

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {page === 'home' && (
              <div className="welcome">
                <h2>Welcome to LibraX</h2>
                <p>Discover, explore and manage your books in one place.</p>

                <button onClick={() => setPage('login')}>
                  Login
                </button>

                <button onClick={() => setPage('signup')}>
                  Sign Up
                </button>
              </div>
            )}

            {page === 'login' && (
              <>
                <Login onLogin={handleLogin} />
                <button onClick={() => setPage('signup')}>
                  Create Account
                </button>
                <button onClick={() => setPage('home')}>
                  Back to Home
                </button>
              </>
            )}

            {page === 'signup' && (
              <>
                <Signup />
                <button onClick={() => setPage('login')}>
                  Already have an account? Login
                </button>
                <button onClick={() => setPage('home')}>
                  Back to Home
                </button>
              </>
            )}
          </>
        )}
      </main>

      <footer>
        <p>© 2026 LibraX. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App