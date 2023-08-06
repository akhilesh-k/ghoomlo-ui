import "./css/select-comp.css";

const SelectComp = ({ name, options, selected, onChange }) => {
  return (
    <>
      <select
        name={name}
        className="select"
        value={selected}
        onChange={onChange}
      >
        {options.map((opt) => {
          return (
            <option key={opt.id} className="option" value={opt.value}>
              {opt.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectComp;
