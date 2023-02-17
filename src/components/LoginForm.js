import '../styles/LoginForm.css'
import { useState, useEffect } from "react"
import DashboardImg from '../static/dashboard.webp'
import usersService from '../services/usersService'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await usersService.login(username, password)
      setUser(loggedUser)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      )

      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  console.log(user)


  return <div className='LoginForm' >
    <div className='login'>
      <h2>Log in to your account</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    <div className='loginContent'>
      <img src={ DashboardImg } alt='App dashboard'/>
    </div>
  </div>
}

export default LoginForm