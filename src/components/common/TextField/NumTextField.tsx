import Input from '@mui/material/Input'
import Box from '@mui/material/Box'
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
    <Box borderRadius={16} border={1} height={50} display={'flex'} justifyContent={'center'}>
      <Input
        disableUnderline={true}
        onChange={({ target: { value } }) => onChange(value)}
        disabled={disabled}
        {...rest}
      />
    </Box>
  )
}
export default NumTextField
