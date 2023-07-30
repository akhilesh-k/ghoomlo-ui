import './css/button-comp.css'

const ButtonComp = ({ type, onClick, children }) => {
  const getClass = () => {
    let classes = 'button'
    switch(type) {
      case 'primary':
        classes += ' button-primary'
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
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ButtonComp