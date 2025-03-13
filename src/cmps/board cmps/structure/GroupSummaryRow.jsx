import { useSelector } from "react-redux"
import DynamicSummary from "./DynamicSummary"
import GroupScrollableColumns from "./GroupScrollableColumns"
import GroupStickyColumns from "./GroupStickyColumns"



const GroupSummaryRow = ({ group }) => {
    const cmpOrder = useSelector(state => state.boardModule.cmpOrder)

    return <section className="summary-row-wrapper">
        <div className="spacer-div">
            <GroupStickyColumns>

            </GroupStickyColumns>
        </div>
        <div className="summary-row">
            <GroupScrollableColumns>
                {cmpOrder.map(cmp => <DynamicSummary key={cmp + " summery"} cmpType={cmp} group={group} />)}
            </GroupScrollableColumns>
        </div>
    </section>
}

export default GroupSummaryRow