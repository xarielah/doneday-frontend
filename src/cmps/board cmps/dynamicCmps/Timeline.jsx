import {
    DatePicker,
    Dialog,
    DialogContentContainer,
    useSwitch
} from "@vibe/core";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";


export function Timeline({ info, onTaskUpdate, isEditable = true }) {
    const { isChecked: isDialogOpen, onChange: onDialogChange } = useSwitch(false);

    const [dateRange, setDateRange] = useState({
        startDate: info?.startDate ? moment(info.startDate) : '',
        endDate: info?.endDate ? moment(info.endDate) : ''
    });

    useEffect(() => {
        if ((info?.startDate && info?.endDate)) {
            setDateRange({ startDate: moment(info.startDate), endDate: moment(info.endDate) })
            return;
        }
    }, [info])

    const { startDate, endDate } = dateRange;

    const handlePickDate = (range) => {
        setDateRange(range);
        if (range.startDate && range.endDate) {
            onTaskUpdate(range);
        }
    };

    const formattedDateRange = useMemo(() => {
        if (!dateRange.startDate || !dateRange.endDate) return "-";
        return `${dateRange.startDate.format("MMM DD")} - ${dateRange.endDate.format("DD")}`;
    }, [dateRange]);

    const isStartDateFuture = moment().startOf('day').isBefore(startDate);
    const isEndDatePassed = moment().startOf('day').isAfter(endDate);

    const calculateProgress = useCallback(() => {
        if (!startDate || !endDate) return 0;

        const totalDuration = endDate.diff(startDate, 'days');
        const remainingDuration = endDate.diff(moment().startOf('day'), 'days');

        if (moment().isBefore(startDate)) return 0;

        return ((totalDuration - Math.max(remainingDuration, 0)) / totalDuration) * 100;
    }, [dateRange]);

    const progressPercent = calculateProgress();

    const getButtonBackground = useMemo(() => {
        if (!startDate || !endDate) return 'gray';
        if (isStartDateFuture) return 'black';
        if (isEndDatePassed) return 'green';
        return `linear-gradient(to right, green ${progressPercent}%, #ddd ${progressPercent}%)`;
    }, [startDate, endDate, isStartDateFuture, isEndDatePassed, progressPercent]);

    return (
        <div className="timeline-container column-label column-label-timeline default-cell-color" style={{ justifyContent: 'center', display: 'flex' }}>
            <Dialog
                modifiers={[{ name: "preventOverflow", options: { mainAxis: false } }]}
                open={isEditable ? isDialogOpen : false}
                showTrigger={isEditable ? [] : null}
                onClickOutside={isEditable && onDialogChange}
                zIndex={1010}
                content={
                    <DialogContentContainer>
                        <DatePicker
                            date={startDate}
                            endDate={endDate}
                            range
                            data-testid="date-picker"
                            onPickDate={handlePickDate}
                        />
                    </DialogContentContainer>
                }
                position="bottom"
            >
                <button
                    className={`set-dates-button ${startDate ? "selected" : "default"}`}
                    onClick={isEditable && onDialogChange}
                    style={{ background: getButtonBackground }}
                    onMouseOver={(e) => (!startDate && isEditable) && (e.currentTarget.innerText = "Set Dates")}
                    onMouseOut={(e) => (!startDate && isEditable) && (e.currentTarget.innerText = "-")}
                >
                    {formattedDateRange}
                </button>
            </Dialog>
        </div>
    );
}
