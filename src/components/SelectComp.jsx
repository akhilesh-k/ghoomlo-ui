import './css/select-comp.css'

const SelectComp = ({ name, options, onChange }) => {
  return (
    <select
      name={name}
      className="select"
      defaultValue="Any"
      onChange={onChange}
    >
      {options.map(opt => {
        return (
          <option
            key={opt.id}
            className="option"
            value={opt.value}
          >
            {opt.name}
          </option>
        )
      })}
    </select>
  )
}

export default SelectComp