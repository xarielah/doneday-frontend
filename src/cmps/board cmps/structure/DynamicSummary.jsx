import DummyCell from "../dynamicCmps/summary-columns/DummyCell"
import PrioritySummary from "../dynamicCmps/summary-columns/PrioritySummary"
import StatusSummary from "../dynamicCmps/summary-columns/StatusSummary"
import TimelineSummary from "../dynamicCmps/summary-columns/TimelineSummary"

const DynamicSummary = ({ cmpType, group }) => {
    switch (cmpType) {
        case "status":
            return <StatusSummary group={group} />
        case "priority":
            return <PrioritySummary group={group} />
        case "timeline":
            return <TimelineSummary group={group} />
        default:
            return <DummyCell className={'column-label-' + cmpType} />
    }
}

export default DynamicSummary