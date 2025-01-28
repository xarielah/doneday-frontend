import DummyCell from "../dynamicCmps/summary-columns/DummyCell"
import PrioritySummary from "../dynamicCmps/summary-columns/PrioritySummary"
import StatusSummary from "../dynamicCmps/summary-columns/StatusSummary"

const DynamicSummary = ({ cmpType, group }) => {
    switch (cmpType) {
        case "status":
            return <StatusSummary group={group} />
        case "priority":
            return <PrioritySummary group={group} />
        default:
            return <DummyCell />
    }
}

export default DynamicSummary