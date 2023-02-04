import { useState } from 'react'

const OrderForm = ({ createOrder }) => {
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleCreateOrder = (event) => {
    event.preventDefault()
    createOrder(location, price, quantity)
    setLocation('')
    setPrice('')
    setQuantity('')
  }

  return <div className="OrderForm">
    <form onSubmit={handleCreateOrder}>
        <div>
          Location
          <input
            type="text"
            value={location}
            name="Location"
            onChange={({ target }) => setLocation(target.value)}
          />
        </div>
        <div>
          Price
          <input
            type="text"
            value={price}
            name="Price"
            onChange={({ target }) => setPrice(target.value)}
          />
        </div>
        <div>
          Quantity
          <input
            type="text"
            value={quantity}
            name="Quantity"
            onChange={({ target }) => setQuantity(target.value)}
          />
        </div>
        <button type="submit">Create Order</button>
      </form>
  </div>
}

export default OrderForm;