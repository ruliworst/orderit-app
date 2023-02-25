import '../styles/OrdersTable.css'
import OrderItem from './OrderItem'

const OrdersTable = (props) => {
  // TODO: Implement Statistics functionality about the data.
  const { orders, deleteOrder } = props

  return <div className="OrdersTable">
    <table>
      <thead>
        <tr>
          <th>Identifier</th>
          <th>Status</th>
          <th>Location</th>
          <th>Price (€)</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => <OrderItem key={order.publicId} id={order.publicId} status={order.status} location={order.location} price={order.price} quantity={order.quantity} deleteOrder={deleteOrder}/>)}
      </tbody>
    </table>
  </div>
}

export default OrdersTable;