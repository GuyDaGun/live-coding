import { ChangeEventHandler } from "react"

interface FormRowProps {
  type: string;
  name: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  labelText?: string;
}

const FormRow: React.FC<FormRowProps> = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  )
};
export default FormRow;
