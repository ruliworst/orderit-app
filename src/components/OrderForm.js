import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import itemsService from '../services/itemsService'

const OrderForm = () => {
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [item, setItem] = useState('')
  const [items, setItems] = useState([])
  const { createOrder } = useOutletContext()

  useEffect(() => {
    itemsService.getAll().then(items => 
      {
        setItems(items)
        setItem(items[0].id)
      })
  }, [])

  const handleCreateOrder = (event) => {
    event.preventDefault()
    createOrder(location, price, quantity, item)
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
        <div>
          Item
          <select name="items" value={item} onChange={({ target }) => setItem(target.value)}>
            {items.map(item => <option value={item.id}>{item.name}</option>)}
          </select>
        </div>
        <button type="submit">Create Order</button>
      </form>
  </div>
}

export default OrderForm;