import './css/button-comp.css'

const ButtonComp = ({ text, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  )
}

export default ButtonComp