import axios from "axios"

const baseUrl = '/api/users'

const login = (username, password) => {
  const credentials = { username, password }
  const request = axios.post(`${baseUrl}/login`, credentials)

  return request.then(response => response.data)
}

const register = (username, password) => {
  const credentials = { username, password }
  const request = axios.post(`${baseUrl}/register`, credentials)

  return request.then(response => response.data)
}

const functions = { login, register }

export default functions