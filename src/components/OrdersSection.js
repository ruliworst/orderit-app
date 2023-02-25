import '../styles/OrdersSection.css'
import OrdersNavigationBar from "./OrdersNavigationBar"
import OrdersTable from "./OrdersTable"
import { useState, useEffect} from 'react'
import ordersService from '../services/ordersService'
import itemsService from '../services/itemsService'

const OrdersSection = (props) => {
  const [orders, setOrders] = useState([])

  const createOrder = (location, price, quantity, item, status = 'Pending') => {
    try {
      ordersService
        .createOrder({ location, price, quantity, status, item })
        .then(order => {
          if (order) {
            // This code is executed to get the item associated to the order. Otherwise, once the order has been created the item name will not be showed automatically.
            itemsService
              .getItem(order.item)
              .then(item =>{ 
                let orderWithUpdatedItem = {...order, item}
                setOrders([...orders, orderWithUpdatedItem])
              })
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