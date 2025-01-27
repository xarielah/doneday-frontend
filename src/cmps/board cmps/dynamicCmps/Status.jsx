import { Dialog, DialogContentContainer, useSwitch } from "@vibe/core";
import { cn } from "../../../services/util.service";
import { DialogValuePicker } from "./DialogValuesPicker";

const modifiers = [
    {
        name: "preventOverflow",
        options: {
            mainAxis: false,
        },
    },
];

const values = [
    { value: 'draft', label: 'Draft', className: 'status-draft' },
    { value: 'done', label: 'Done', className: 'status-done' },
    { value: 'wip', label: 'Working on it', className: 'status-wip' },
    { value: 'stuck', label: 'Stuck', className: 'status-stuck' },
    { value: 'onhold', label: 'On Hold', className: 'status-onhold' },
    { value: 'revision', label: 'Requires Revision', className: 'status-revision' },
    { value: 'design', label: 'In Design', className: 'status-design' },
]

function getLabel(statusValue) {
    return values.find(value => value.value === statusValue)?.label || statusValue
}

export function Status({ info, onTaskUpdate }) {
    const { isChecked: isDialogOpen, onChange: onDialogChange } = useSwitch({
        defaultChecked: false,
    });

    const handleValueChange = (value) => {
        onDialogChange();
        onTaskUpdate(value)
    }

    return (
        <Dialog
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
                className={cn('fancy-value-picker column-label-status', `status-${info}`)}
                onClick={onDialogChange}>
                {getLabel(info)}
                <span className="fold"></span>
            </div>
        </Dialog>
    )
}