interface RadioProps {
  name: string
  items: { value: string; label: string }[]
  value: string | null
  onChange: (value: string) => void
}

const RadioGroupButton = ({ name, items, value, onChange }: RadioProps) => {
  return (
    <>
      {items.map((item) => (
        <div key={item.value}>
          <input
            name={name}
            type='radio'
            value={item.value}
            id={name + item.value}
            checked={value === item.value}
            onChange={(e) => onChange(e.target.value)}
          />{' '}
          <label htmlFor={name + item.value}>{item.label}</label>
        </div>
      ))}
    </>
  )
}

export default RadioGroupButton
