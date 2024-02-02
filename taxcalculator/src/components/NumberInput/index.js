import './index.css';

export default function NumberInput({label, id, defaultValue = 0, setValueState, onChange, unit}) {

    const onInputChange = (e) => {
        setValueState(e.target.value);
        onChange(e);
    }

    return (
        <>
            <label className={"numberInputLabel"}>
                {label}
                <div className={"inputWithUnit"}>
                    <input
                        className={"numberInput"}
                        id={id}
                        placeholder={`Input ${label}`}
                        defaultValue={defaultValue || 0}
                        onChange={onInputChange}
                    />
                    {
                        unit && <span className={"unit"}>{unit}</span>
                    }
                </div>

            </label>
            <br/>
        </>
    );
}