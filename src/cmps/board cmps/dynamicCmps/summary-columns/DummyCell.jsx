import { cn } from "../../../../services/util.service"

const DummyCell = ({ className }) => {
    return <div className={cn('dummy-cell', 'default-cell-color', 'bottom-border', className)} style={{ borderTop: 'none' }}></div>
}

export default DummyCell