import DummyCell from "../dynamicCmps/summary-columns/DummyCell"
import MemberSummery from "../dynamicCmps/summary-columns/MemberSummery"
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
        case "members":
            return <MemberSummery group={group} />
        default:
            return <DummyCell className={'column-label-' + cmpType} />
    }
}

export default DynamicSummary