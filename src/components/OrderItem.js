import '../styles/OrderItem.css';
import { FaCheckSquare, FaTrashAlt } from 'react-icons/fa'

const OrderItem = props => {
  const {id, status, location, price, quantity, item, deleteOrder, completeOrder} = props

  const handleDelete = () => {
    deleteOrder(id)
  }

  const handleComplete = () => {
    const order = {id, status, location, price, quantity, item}
    completeOrder(id, order)
  }

  return <tr className="OrderItem">
    <td>{ id }</td>
    <td>{ status }</td>
    <td>{ location }</td>
    <td>{ price }</td>
    <td>{ quantity }</td>
    <td>{ item }</td>
    <td>
      <button onClick={handleComplete}>{ FaCheckSquare() }</button>
      <button onClick={handleDelete}>{ FaTrashAlt() }</button>
    </td>
  </tr>
}

export default OrderItem;