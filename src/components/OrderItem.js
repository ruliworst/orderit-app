import '../styles/OrderItem.css';
import { FaTrashAlt } from 'react-icons/fa'

const OrderItem = props => {
  const {id, location, price, quantity, deleteOrder} = props

  const handleDelete = () => {
    deleteOrder(id)
  }

  return <tr className="OrderItem">
    <td>{ id }</td>
    <td>{ location }</td>
    <td>{ price }</td>
    <td>{ quantity }</td>
    <td><button onClick={handleDelete}>{ FaTrashAlt() }</button></td>
  </tr>
}

export default OrderItem;