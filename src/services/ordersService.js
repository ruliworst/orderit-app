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

const createOrder = order => {
  const request = axios.post(`${baseUrl}`, order)

  return request.then(response => response.data)
}

const completeOrder = (publicId, order) => {
  const request = axios.put(`${baseUrl}/${publicId}`, {...order, status: 'Delivered'})
 
  return request.then(response => response.data)
}

const functions = { getAll, getOrder, createOrder, deleteOrder, completeOrder }

export default functions