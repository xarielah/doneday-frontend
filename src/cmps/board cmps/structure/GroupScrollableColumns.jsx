import GroupColumnFiller from "./GroupColumnFillter"

const GroupScrollableColumns = ({ children }) => {
    return <section className="group-scrollable-columns table-row-layout">
        {children}
        <GroupColumnFiller />
    </section>
}

export default GroupScrollableColumns