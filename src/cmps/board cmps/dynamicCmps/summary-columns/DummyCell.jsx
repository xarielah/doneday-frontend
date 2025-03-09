import { cn } from "../../../../services/util.service"

const DummyCell = ({ className }) => {
    return <div className={cn('dummy-cell', 'default-cell-color', className)}></div>
}

export default DummyCell