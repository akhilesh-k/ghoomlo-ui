import './css/button-comp.css'

const ButtonComp = ({ type, disabled, onClick, children }) => {
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