const OrderForm = (props) => {
  return <div className="OrderForm">
    <form>
      <label for="fLocation">Location</label>
      <input type="text" id="fLocation" name="fLocation" />
      <label for="fPrice">Price</label>
      <input type="text" id="fPrice" name="fPrice" />
      <label for="fQuantity">Quantity</label>
      <input type="text" id="fQuantity" name="fQuantity" />
      <input type="submit" value="Add new order" />
    </form>
  </div>
}

export default OrderForm;