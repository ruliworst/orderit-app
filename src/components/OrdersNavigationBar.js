import '../styles/OrdersNavigationBar.css'
import Togglable from './Togglable'
import OrderForm from './OrderForm'
import { useRef } from 'react'

const OrdersNavigationBar = (props) => {
  const { createOrder } = props

  const createOrderFormRef = useRef()

  return <div className="OrdersNavigationBar">
    <h3>Orders</h3>
    <ul>
      <li>All</li>
      <li>Pending</li>
      <li>Delivered</li>
      <li>Cancelled</li>
      <li>Returned</li>
    </ul>
    <Togglable buttonLabel="New Order" ref={createOrderFormRef}>
      <OrderForm createOrder={createOrder}/>
    </Togglable>
  </div>
}

export default OrdersNavigationBar;