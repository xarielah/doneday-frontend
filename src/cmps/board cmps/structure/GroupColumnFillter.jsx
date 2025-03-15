import { cn } from "../../../services/util.service"

const GroupColumnFiller = ({ borders = false }) => {
    return <div className={cn("column-filler", "full", borders && "top-bottom-border")}></div>
}

export default GroupColumnFiller