import { Input } from '~/components/style/Theme'

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
  return <Input onChange={({ target: { value } }) => onChange(value)} disabled={disabled} {...rest} />
}

export default NumTextField
