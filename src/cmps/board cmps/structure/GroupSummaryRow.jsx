import DynamicSummary from "./DynamicSummary"



const GroupSummaryRow = ({ group, cmpOrder }) => {
    return <section className="summary-row-wrapper">
        <div className="spacer-div"></div>
        <div className="summary-row">
            {cmpOrder.map(cmp => <DynamicSummary key={cmp} cmpType={cmp} group={group} />)}
        </div>
    </section>
}

export default GroupSummaryRow