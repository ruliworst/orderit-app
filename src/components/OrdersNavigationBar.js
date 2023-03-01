import '../styles/OrdersNavigationBar.css'
import { Link } from 'react-router-dom'

const OrdersNavigationBar = (props) => {
  const { handleFilterChange } = props

  return <div className="OrdersNavigationBar">
    <h3>Orders</h3>
    <ul>
      <Link to="/orders/"><li onClick={ () => handleFilterChange(null) }>All</li></Link>
      <Link to="/orders/"><li onClick={ () => handleFilterChange('Pending') }>Pending</li></Link>
      <Link to="/orders/"><li onClick={ () => handleFilterChange('Delivered') }>Delivered</li></Link>
      <Link to="/orders/"><li onClick={ () => handleFilterChange('Cancelled') }>Cancelled</li></Link>
      <Link to="/orders/"><li onClick={ () => handleFilterChange('Returned') }>Returned</li></Link>
    </ul> 
    <Link to='/orders/create' class='createOrderLink'>New Order</Link>
  </div>
}

export default OrdersNavigationBar;