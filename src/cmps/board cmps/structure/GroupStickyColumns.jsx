import { forwardRef } from "react"

const GroupStickyColumns = forwardRef(({ children }, ref) => {
    return <section ref={ref} className="group-sticky-columns table-row-layout">
        {children}
    </section>
})

export default GroupStickyColumns