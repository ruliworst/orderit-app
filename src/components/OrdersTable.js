import OrderItem from './OrderItem'
import ordersService from '../services/ordersService'
import { useEffect, useState } from 'react'

const OrdersTable = () => {
  // TODO: Implement Statistics functionality about the data.

  const [orders, setOrders] = useState([])

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