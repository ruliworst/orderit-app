import CustomButton from './CustomButton';

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
    <td><CustomButton text="delete" action={handleDelete} /></td>
  </tr>
}

export default OrderItem;