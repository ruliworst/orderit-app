import OrdersNavigationBar from "./OrdersNavigationBar"
import OrdersTable from "./OrdersTable"
import { useState, useEffect} from 'react'
import ordersService from '../services/ordersService'

const OrdersSection = (props) => {
  const [orders, setOrders] = useState([])

  const createOrder = (location, price, quantity) => {
    try {
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
          const newOrders = orders.filter(order => order.publicId !== orderId)
          setOrders(newOrders)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return <div className="OrdersSection">
    <OrdersNavigationBar createOrder={ createOrder }/>
    <OrdersTable orders={ orders } deleteOrder={ deleteOrder }/>
  </div>
}

export default OrdersSection