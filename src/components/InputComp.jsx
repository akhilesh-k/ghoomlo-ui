import "./css/input-comp.css";

const InputComp = ({ id, placeholder, type, value, label, onChange }) => {
  if (label?.length) {
    return (
      <span className="input-container">
        <label htmlFor={`${type}-${id}`}>{label}:</label>
        <input
          id={`${type}-${id}`}
          className="input"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </span>
    );
  } else {
    return (
      <input
        id={`${type}-${id}`}
        className="input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }
};

export default InputComp;
