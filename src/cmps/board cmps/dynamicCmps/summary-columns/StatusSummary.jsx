import { useEffect, useState } from "react";
import ColorBox from "./ColorBox";

const StatusSummary = ({ group }) => {
    const [statuses, setStatuses] = useState([]);
    useEffect(() => {
        const statusesCountObj = group.tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {})

        const availableStatuses = Object.keys(statusesCountObj);

        const statusesCalc = availableStatuses.map(status => {
            return ({
                status,
                percent: parseFloat((statusesCountObj[status] / group.tasks.length * 100).toFixed(2))
            })
        })
        setStatuses(statusesCalc)
    }, [group.tasks])

    return <div className="status-summary summary-cell column-label-status">
        <div className="visual-summary-container">
            {statuses.length === 0 && <ColorBox className={`status-draft`} width={100} />}
            {statuses.length > 0 && statuses.map(status => <ColorBox className={`status-${status.status}`} width={status.percent} key={status.status} />)}
        </div>
    </div>
}

export default StatusSummary