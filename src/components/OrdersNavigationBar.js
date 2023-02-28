import '../styles/OrdersNavigationBar.css'
import Togglable from './Togglable'
import OrderForm from './OrderForm'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const OrdersNavigationBar = (props) => {
  const { createOrder } = props

  const createOrderFormRef = useRef()

  return <div className="OrdersNavigationBar">
    <h3>Orders</h3>
    <ul>
      <Link to="/orders/"><li>All</li></Link>
      <li>Pending</li>
      <li>Delivered</li>
      <li>Cancelled</li>
      <li>Returned</li>
    </ul>
    <Link to='/orders/create' class='createOrderLink'>New Order</Link>
  </div>
}

export default OrdersNavigationBar;