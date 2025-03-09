import moment from "moment"
import { useEffect, useState } from "react"
import { Timeline } from "../Timeline"

export default function TimelineSummary({ group }) {
    const [totalRange, setTotalRange] = useState({ startDate: '', endDate: '' })

    useEffect(() => {
        const ranges = group.tasks.reduce((acc, task) => {
            const { startDate, endDate } = task.timeline;

            if (!acc.startDate && startDate) {
                acc.startDate = startDate;
            }

            if (!acc.endDate && endDate) {
                acc.endDate = endDate;
            }

            if (acc.startDate && moment(startDate).isBefore(acc.startDate)) {
                acc.startDate = startDate;
            }

            if (acc.endDate && moment(endDate).isAfter(acc.endDate)) {
                acc.endDate = endDate;
            }

            return acc;
        }, { startDate: '', endDate: '' })

        setTotalRange(ranges)
    }, [group.tasks, group])

    return <div className="timeline-summary summary-cell column-label column-label-timeline">
        <Timeline info={totalRange} isEditable={false} />
    </div>
}   