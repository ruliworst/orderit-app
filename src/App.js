import './App.css';
import OrdersTable from './components/OrdersTable';
import OrdersNavigationBar from './components/OrdersNavigationBar';
import { useState } from 'react';
import loginService from './services/loginService'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedUser = await loginService.login(username, password)
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

  return (
    <div className="App">
      {
        user === null
          ? loginForm()
          : <div>
              <h1>Order It!</h1>
              <p>The app for managing all your e-commerce orders.</p>
              <OrdersNavigationBar />
              <OrdersTable />
            </div>
      }
    </div>
  );
}

export default App;
