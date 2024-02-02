import './index.css';

export default function NumberResult({label, value, unit}) {
    return (
        <div className={"numberResult"}>
            <p className={"label"}>
                {label}
            </p>
            <div >
                <span className={"unit"}>
                    {unit}
                </span>
                <span className={"value"}>
                    {value}
                </span>
            </div>

        </div>
    );
}