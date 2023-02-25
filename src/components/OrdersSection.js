import '../styles/OrdersSection.css'
import OrdersNavigationBar from "./OrdersNavigationBar"
import OrdersTable from "./OrdersTable"
import { useState, useEffect} from 'react'
import ordersService from '../services/ordersService'

const OrdersSection = (props) => {
  const [orders, setOrders] = useState([])

  const createOrder = (location, price, quantity, status = 'Pending') => {
    try {
      ordersService
        .createOrder({ location, price, quantity, status })
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
      if(window.confirm("Are you sure you want to delete the order?")) {
        ordersService
        .deleteOrder(orderId)
        .then(() => {
          const newOrders = orders.filter(order => order.publicId !== orderId)
          setOrders(newOrders)
        })
      }
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