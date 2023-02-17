const CustomButton = props => {
  const {text, action, icon} = props

  return <button onClick={action}>
    {text === null
      ? icon
      : text
    }
  </button>
}

export default CustomButton;