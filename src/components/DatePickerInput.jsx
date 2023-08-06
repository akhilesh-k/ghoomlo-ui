import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerInput = ({ selectedDate, onChange }) => {
  // Get the current date
  const currentDate = new Date();

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      dateFormat="dd/MM/yyyy" // Customize the date format as per your needs
      placeholderText="Select your booking date"
      className="input datepicker-input" // You can add your custom styles here
      showPopperArrow={false} // Disable the popper arrow for a cleaner look
      minDate={currentDate} // Set the minimum date to the current date
    />
  );
};

export default DatePickerInput;
