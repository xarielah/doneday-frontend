import {
    Dialog,
    DialogContentContainer,
    DatePicker,
    useSwitch
} from "@vibe/core";
import { useState, useMemo, useCallback } from "react";
import moment from "moment";

const MOCK_INITIAL_DATE = { startDate: '', endDate: '' };

export function Timeline({ info, onTaskUpdate }) {
    const { isChecked: isDialogOpen, onChange: onDialogChange } = useSwitch(false);

    const [dateRange, setDateRange] = useState(() => ({
        startDate: info?.startDate ? moment(info.startDate) : '',
        endDate: info?.endDate ? moment(info.endDate) : ''
    }));

    const { startDate, endDate } = dateRange;

    const handlePickDate = (range) => {
        setDateRange(range);
        if (range.startDate && range.endDate) {
            onTaskUpdate(range);
        }
    };

    const formattedDateRange = useMemo(() => {
        if (!startDate || !endDate) return "-";
        return `${startDate.format("MMM DD")} - ${endDate.format("DD")}`;
    }, [startDate, endDate]);

    const isStartDateFuture = moment().startOf('day').isBefore(startDate);
    const isEndDatePassed = moment().startOf('day').isAfter(endDate);

    const calculateProgress = useCallback(() => {
        if (!startDate || !endDate) return 0;

        const totalDuration = endDate.diff(startDate, 'days');
        const remainingDuration = endDate.diff(moment().startOf('day'), 'days');

        if (moment().isBefore(startDate)) return 0;

        return ((totalDuration - Math.max(remainingDuration, 0)) / totalDuration) * 100;
    }, [startDate, endDate]);

    const progressPercent = calculateProgress();

    const getButtonBackground = useMemo(() => {
        if (!startDate || !endDate) return 'gray';
        if (isStartDateFuture) return 'black';
        if (isEndDatePassed) return 'green';
        return `linear-gradient(to right, green ${progressPercent}%, #ddd ${progressPercent}%)`;
    }, [startDate, endDate, isStartDateFuture, isEndDatePassed, progressPercent]);

    return (
        <div className="timeline-container column-label column-label-date default-cell-color">
            <Dialog
                modifiers={[{ name: "preventOverflow", options: { mainAxis: false } }]}
                open={isDialogOpen}
                showTrigger={[]}
                onClickOutside={onDialogChange}
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
                    onClick={onDialogChange}
                    style={{ background: getButtonBackground }}
                    onMouseOver={(e) => !startDate && (e.currentTarget.innerText = "Set Dates")}
                    onMouseOut={(e) => !startDate && (e.currentTarget.innerText = "-")}
                >
                    {startDate ? formattedDateRange : "-"}
                </button>
            </Dialog>
        </div>
    );
}
