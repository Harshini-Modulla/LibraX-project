import { useState } from 'react'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSignup(e) {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users')) || []

    const existingUser = users.find((u) => u.email === email)

    if (existingUser) {
      alert('This email is already registered!')
      return
    }

    const newUser = { name, email, password, role: 'user' }

    users.push(newUser)

    localStorage.setItem('users', JSON.stringify(users))

    alert('Signup successful! You can now login.')

    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="login-container">
      <h2>Create Your Account</h2>
      <p>Join LibraX Library</p>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup