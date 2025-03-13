import GroupColumnFiller from "./GroupColumnFillter"


const GroupScrollableColumns = ({ children, bottomBorder = false }) => {

    return <section className={`group-scrollable-columns table-row-layout ${bottomBorder && " bottom-border"}`}>
        {children}
        < GroupColumnFiller />
    </section >
}

export default GroupScrollableColumns