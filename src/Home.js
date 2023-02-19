import './Home.css';
import Logo from './static/logo_transparent.png'
import { useState, useRef, useEffect, createContext } from 'react';
import usersService from './services/usersService'
import Togglable from './components/Togglable';
import { Link, Outlet } from 'react-router-dom'

export const UserContext = createContext()

const Home = () => {
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

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
    } catch (e) {
      console.error(e)
    }
  }

  const showUnloggedUserNavigationBar = () => {
    return <nav>
      <div className='logo'>
        <a href='/'><img src={ Logo } alt="OrderIt logo" /></a>  
      </div>
      <ul>
        <li><a href="/demo">Our product</a></li>
        <li><a href="/about">Who are we?</a></li>
        <li><a href="/pricing">Pricing</a></li>
      </ul>  
      <div className="signInSection">
        <span className='loginButton'>
          {
            localStorage.getItem('loggedUser') === null
              ? <Link to='/login'>Sign In</Link>
              : <Link to='/orders'>Sign In</Link>
          }
        </span>
        <a href="/orders" className='tryFreeLink'>Try Free</a>
      </div>
    </nav>
  }
  
  const showLoggedUserNavigationBar = () => {
    return <nav>
      <div className='logo'>
        <a href='/'><img src={ Logo } alt="OrderIt logo" /></a>  
      </div>
      <ul>
      </ul>  
      <div className="signInSection center">
        <span className='loginButton'>
          <Link to='/' onClick={ handleLogout }>Log Out</Link>
        </span>
      </div>
    </nav>
  }

  return (
    <UserContext.Provider value={ {user, setUser} }>
      <div className="Home">
        {
          user === null
            ? showUnloggedUserNavigationBar()
            : showLoggedUserNavigationBar()
        }
        <div id="homeContent"><Outlet /></div>
      </div>
    </UserContext.Provider>
  );
}

export default Home;

/*
      {
        <div>
          { loginForm() }
          { localStorage.getItem('loggedUser') !== null 
            ? <OrdersSection />
            : null
          }
        </div>
      }

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
