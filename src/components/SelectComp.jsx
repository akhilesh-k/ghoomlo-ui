import { useSelector } from "react-redux";
import "./css/select-comp.css";

const SelectComp = ({ name, options, onChange }) => {
  const selected = useSelector(state => state.booking.vehicle)

  return (
    <>
    {selected}
      <select
        name={name}
        className="select"
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
