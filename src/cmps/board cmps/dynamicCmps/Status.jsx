import { Dialog, DialogContentContainer, useSwitch } from "@vibe/core";
import { cn } from "../../../services/util.service";
import { DialogValuePicker } from "./DialogValuesPicker";
import { statusList } from "../../../services/board/board.service.local";

const modifiers = [
    {
        name: "preventOverflow",
        options: {
            mainAxis: false,
        },
    },
];

export const values = statusList


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