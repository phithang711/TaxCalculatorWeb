interface NumTextFieldProps {
  value: number
  onChange: (val: string) => void
  placeholder?: string
  autoFocus?: boolean
  name?: string
  type?: 'email' | 'password' | 'text'
}

const NumTextField = ({ onChange, ...rest }: NumTextFieldProps) => {
  return (
    <input
      className='rounded-md w-full border border-gray-400 p-3 mb-5'
      onChange={({ target: { value } }) => onChange(value)}
      {...rest}
    />
  )
}

export default NumTextField
