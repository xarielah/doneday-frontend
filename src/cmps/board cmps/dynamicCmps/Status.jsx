import { Dialog, DialogContentContainer, useSwitch } from "@vibe/core";
import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { statusList } from "../../../services/board";
import { cn } from "../../../services/util.service";
import { DialogValuePicker } from "./DialogValuesPicker";

const modifiers = [
    {
        name: "preventOverflow",
        options: { mainAxis: false },
    },
];

export const values = statusList;

function getLabel(statusValue) {
    return values.find((value) => value.value === statusValue)?.label || statusValue;
}

export function Status({ info, onTaskUpdate }) {
    const { isChecked: isDialogOpen, onChange: onDialogChange } = useSwitch({ defaultChecked: false });
    const [showConfetti, setShowConfetti] = useState(false);
    const containerRef = useRef(null);
    const prevInfoRef = useRef(info);

    const handleValueChange = (value) => {
        onDialogChange();
        onTaskUpdate(value);
    };

    useEffect(() => {
        if (prevInfoRef.current !== "done" && info === "done") {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 6000);
            return () => clearTimeout(timer);
        }
        prevInfoRef.current = info;
    }, [info]);

    const containerWidth = 180;
    const containerHeight = 36;

    return (
        <Dialog
            modifiers={modifiers}
            open={isDialogOpen}
            showTrigger={[]}
            onClickOutside={onDialogChange}
            zIndex={1010}
            content={
                <DialogContentContainer size="large" className="fancy-value-picker-dialog">
                    <DialogValuePicker data={values} onPick={(option) => handleValueChange(option.value)} />
                </DialogContentContainer>
            }
            position="bottom"
        >
            <div
                ref={containerRef}
                className={cn("fancy-value-picker column-label-status", `status-${info}`)}
                onClick={onDialogChange}
                style={{ position: "relative", overflow: "hidden", width: containerWidth, height: containerHeight }}
            >
                {getLabel(info)}
                <span className="fold"></span>
                {showConfetti && (
                    <Confetti
                        width={containerWidth}
                        height={containerHeight}
                        numberOfPieces={300}
                        recycle={false}
                        confettiConfig={{
                            scalar: 0.1,       // Make particles smaller
                            gravity: 0.5,      // Lower gravity for a gentle fade-out effect
                            startVelocity: 20, //Velocity
                        }}
                    />
                )}
            </div>
        </Dialog>
    );
}
