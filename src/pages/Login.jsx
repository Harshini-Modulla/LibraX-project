import { useState } from 'react'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e) {
    e.preventDefault()

    // Demo admin account
    if (
      email === 'admin@librax.com' &&
      password === 'Admin@123'
    ) {
      onLogin({
        name: 'Admin',
        email,
        role: 'admin'
      })
      return
    }

    // Check registered users
    const users = JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (user) {
      onLogin(user)
    } else {
      alert('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      <p>Login to your LibraX account</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? Sign up!</p>
    </div>
  )
}

export default Login