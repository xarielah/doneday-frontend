import { Dialog, DialogContentContainer, useSwitch } from "@vibe/core";
import { cn } from "../../../services/util.service";
import DialogValuePicker from "./DialogValuesPicker";

const modifiers = [
    {
        name: "preventOverflow",
        options: {
            mainAxis: false,
        },
    },
];

export const values = [
    { value: 'low', label: 'Low', className: 'priority-low' },
    { value: 'medium', label: 'Medium', className: 'priority-medium' },
    { value: 'high', label: 'High', className: 'priority-high' },
    { value: 'critical', label: 'Critical', className: 'priority-critical' },
    { value: 'tbd', label: 'TBD', className: 'priority-tbd' },
]

function getLabel(value) {
    return values.find(v => v.value === value)?.label || value
}

export function Priority({ info, onTaskUpdate }) {
    const { isChecked: isDialogOpen, onChange: onDialogChange } = useSwitch(false)

    const handleValueChange = (value) => {
        onDialogChange();
        onTaskUpdate(value)
    }

    return (<Dialog
        modifiers={modifiers}
        open={isDialogOpen}
        showTrigger={[]}
        onClickOutside={onDialogChange}
        zIndex={1010}
        content={
            <DialogContentContainer size="large" className="fancy-value-picker-dialog">
                <DialogValuePicker data={values} onPick={option => handleValueChange(option.value)} />
            </DialogContentContainer>
        }
        position="bottom">
        <div
            className={cn("fancy-value-picker column-label-priority", `priority-${info}`)}
            onClick={onDialogChange}>
            {getLabel(info)}
            <span className="fold"></span>
        </div>
    </Dialog>)
}