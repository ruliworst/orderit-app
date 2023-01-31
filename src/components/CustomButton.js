const CustomButton = props => {
  const {text, action} = props

  return <button onClick={action}>
    { text }
  </button>
}

export default CustomButton;