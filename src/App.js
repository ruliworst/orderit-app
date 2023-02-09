import './App.css';
import Logo from './static/logo_transparent.png'
import { useState, useEffect, useRef } from 'react';
import usersService from './services/usersService'
import Togglable from './components/Togglable';
import OrdersSection from './components/OrdersSection'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameRegister, setUsernameRegister] = useState('')
  const [passwordRegister, setPasswordRegister] = useState('')

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

  const loginForm = () => {
    return <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
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
  }

  const registerFormRef = useRef()

  const registerForm = () => {
    return (
      <Togglable buttonLabel="Register" ref={ registerFormRef }>
        <div>
          <form onSubmit={handleRegister}>
          <div>
              username
              <input
                type="text"
                value={usernameRegister}
                name="Username"
                onChange={({ target }) => setUsernameRegister(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={passwordRegister}
                name="Password"
                onChange={({ target }) => setPasswordRegister(target.value)}
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </Togglable>
    )
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      await usersService.register(usernameRegister, passwordRegister)

      setUsernameRegister('')
      setPasswordRegister('')
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <div className="App">
      <nav>
        <div className='logo'>
          <a href='#'><img src={ Logo } alt="OrderIt logo" /></a>  
        </div>
        <ul>
          <li>Our product</li>
          <li>Who are we?</li>
          <li>Pricing</li>
        </ul>  
        <div className="signInSection">
          <span>Sign In</span>
          <a href="#">Try Free</a>
        </div>
      </nav>
      {
        <div>
          { loginForm() }
          { localStorage.getItem('loggedUser') !== null 
            ? <OrdersSection />
            : null
          }
        </div>
      }
    </div>
  );
}

export default App;

/*
{
        user === null
          ? <header>
              <h1>Order It!</h1>
              <ul>
                <li>Our product</li>
                <li>Who are we?</li>
                <li>Pricing</li>
              </ul>  
              <div>
                { loginForm() }
                { registerForm() }
              </div>
            </header>
          : <div>
              <header>
                <div>
                  <h1>Order It!</h1>
                  <p>The app for managing all your e-commerce orders.</p>  
                </div>
                <button onClick={handleLogout}>Logout</button>  
              </header>
              <OrdersSection />
            </div>

          { loginForm() }
          { registerForm() }
      }
*/
