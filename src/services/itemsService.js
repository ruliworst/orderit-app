import axios from 'axios'

const baseUrl = '/api/items'

const getAll = () => {
  const request = axios.get(baseUrl)
  
  return request.then(response => response.data)
}

const getItem = id => {
  const request = axios.get(`${baseUrl}/${id}`)

  return request.then(response => response.data)
}

const functions = { getAll, getItem }

export default functions