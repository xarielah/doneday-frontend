import { useSelector } from "react-redux"
import DynamicSummary from "./DynamicSummary"



const GroupSummaryRow = ({ group }) => {
    const cmpOrder = useSelector(state => state.boardModule.cmpOrder)

    return <section className="summary-row-wrapper">
        <div className="spacer-div"></div>
        <div className="summary-row">
            {cmpOrder.map(cmp => <DynamicSummary key={cmp + " summery"} cmpType={cmp} group={group} />)}
        </div>
    </section>
}

export default GroupSummaryRow