interface NumTextFieldProps {
  value: number
  onChange: (val: string) => void
  placeholder?: string
  autoFocus?: boolean
  name?: string
  disabled?: boolean
  type?: 'email' | 'password' | 'text'
}

const NumTextField = ({ onChange, disabled, ...rest }: NumTextFieldProps) => {
  return (
    <input
      className='rounded-md w-full border border-gray-400 p-3 mb-5'
      onChange={({ target: { value } }) => onChange(value)}
      disabled={disabled}
      {...rest}
    />
  )
}

export default NumTextField
