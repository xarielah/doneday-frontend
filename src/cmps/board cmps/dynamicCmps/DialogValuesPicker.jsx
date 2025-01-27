import { cn } from "../../../services/util.service"

export function DialogValuePicker({ data, onPick }) {
    return (
        <ul className="dialog-value-picker">
            {data.map(({ value, label, className = '' }) => (
                <li
                    key={value}
                    role="button"
                    className={cn('dialog-value-picker-item', className)}
                    onClick={() => onPick({ value, label, className })}>
                    {label}
                </li>
            ))}
        </ul>
    )
}

export default DialogValuePicker