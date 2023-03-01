import '../styles/OrdersSection.css'
import OrdersNavigationBar from "./OrdersNavigationBar"
import { useState, useEffect} from 'react'
import ordersService from '../services/ordersService'
import itemsService from '../services/itemsService'
import { Outlet } from 'react-router-dom'

const OrdersSection = (props) => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])

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
    ordersService.getAll().then(orders => {
      setOrders(orders)
      setFilteredOrders(orders)
    })
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

  const completeOrder = (orderPublicId) => {
    try {
      if(window.confirm("Are you sure you want to complete the order?")) {
        
      }
    } catch (error) {
      console.error()
    }
  }

  const handleFilterChange = (value = null) => {
    const ordersAfterFilter = value === null ? orders : orders.filter(order => order.status === value)
    setFilteredOrders(ordersAfterFilter)
  }

  return <div className="OrdersSection">
    <OrdersNavigationBar handleFilterChange={ handleFilterChange }/>
    <Outlet context={{filteredOrders, deleteOrder, createOrder}}/>
  </div>
}

export default OrdersSection

//<OrdersTable orders={ orders } deleteOrder={ deleteOrder }/>
