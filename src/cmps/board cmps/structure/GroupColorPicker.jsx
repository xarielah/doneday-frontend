import { ColorPicker, Dialog, DialogContentContainer } from "@vibe/core";

export function GroupColorPicker({ groupColor, handleChangeColor }) {


    return (
        <Dialog
            // modifiers={modifiers}
            // open={checkedTop}
            position="top"
            showTrigger={['click']}
            hideTrigger={[]}
            content={
                <DialogContentContainer>
                    <ColorPicker
                        value={groupColor}
                        onSave={(c) => handleChangeColor(c)}
                        colorShape="circle"
                        colorSize="small"
                    />
                </DialogContentContainer>
            }
        >
            <div className="group-color-picker" style={{ backgroundColor: groupColor }}>
            </div>
        </Dialog>
    )
}