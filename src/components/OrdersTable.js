import OrderItem from './OrderItem'
import { useRef, useState, useEffect } from 'react'
import ordersService from '../services/ordersService'
import Togglable from './Togglable'
import OrderForm from './OrderForm'

const OrdersTable = (props) => {
  // TODO: Implement Statistics functionality about the data.
  const [orders, setOrders] = useState([])

  const createOrderFormRef = useRef()

  const createOrder = (location, price, quantity) => {
    try {
      createOrderFormRef.current.toggleVisibility()
      ordersService
        .createOrder({ location, price, quantity })
        .then(order => {
          if (order) {
            setOrders([...orders, order])
          }
        })
    } catch (e) {
      console.error(e)
    }
  } 
  
  useEffect(() => {
    ordersService.getAll().then(orders => setOrders(orders))
  }, [])

  const deleteOrder = (orderId) => {
    try {
      ordersService
        .deleteOrder(orderId)
        .then(() => {
          const newOrders = orders.filter(order => order.id !== orderId)
          setOrders(newOrders)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return <div className="OrdersTable">
    <Togglable buttonLabel="New Order" ref={createOrderFormRef}>
      <OrderForm createOrder={createOrder}/>
    </Togglable>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Location</th>
          <th>Price (€)</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => <OrderItem key={order.id} id={order.id} location={order.location} price={order.price} quantity={order.quantity} deleteOrder={deleteOrder}/>)}
      </tbody>
    </table>
  </div>
}

export default OrdersTable;