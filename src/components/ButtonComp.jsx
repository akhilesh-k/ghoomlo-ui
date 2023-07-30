import './css/button-comp.css'

const ButtonComp = ({ type, disabled, size, onClick, children }) => {
  const getClass = () => {
    let classes = 'button'
    switch(type) {
      case 'primary':
        classes += ' button-primary'
        if (disabled) {
          classes += ' disabled-primary'
        }
        break
      case 'secondary':
        classes += ' button-secondary'
        break
    }
    switch(size) {
      case 'small':
        classes += ' button-small'
        break
    }
    return classes
  }
  return (
    <button
      className={getClass()}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonComp