import { useEffect, useState } from 'react'

interface TextFieldProps {
  label?: string
  placeholder?: string
  initialValue: string
  classNames?: string
  onChange: (val: string) => void
}

const CalTaxTextField = ({ label, initialValue, onChange, classNames, placeholder }: TextFieldProps) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (val: string) => {
    setValue(val)
    onChange(val)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div style={{ textAlign: 'left' }} className={classNames}>
      {label && <label className='block text-sm font-medium text-gray-700 pb-1 ps-1'>{label}</label>}
      <input
        type='text'
        value={value}
        className='form-control'
        onChange={({ target: { value } }) => handleChange(value)}
        placeholder={placeholder}
      />
    </div>
  )
}
export default CalTaxTextField
