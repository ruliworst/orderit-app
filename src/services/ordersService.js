import axios from 'axios'

const baseUrl = '/api/orders'

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const getOrder = id => {
  const request = axios.get(`${baseUrl}/${id}`)

  return request.then(response => response.data)
}

const deleteOrder = id => {
  const request = axios.delete(`${baseUrl}/${id}`)

  return request.then(response => response.data)
}

const postOrder = order => {
  const request = axios.post(`${baseUrl}`, order)

  return request.then(response => response.data)
}

const functions = { getAll, getOrder, postOrder, deleteOrder }

export default functions