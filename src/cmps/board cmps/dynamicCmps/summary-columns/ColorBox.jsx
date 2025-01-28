import { Tooltip } from "@vibe/core"
import { useState } from "react"

const ColorBox = ({ width, className, tooltip }) => {
    const [showTooltip, setShowTooltip] = useState(false)

    const openTooltipOnHover = () => setShowTooltip(true)
    const closeTooltipOnLeave = () => setShowTooltip(false)

    return <div
        onMouseEnter={openTooltipOnHover}
        onMouseLeave={closeTooltipOnLeave}
        className={`color-box ${className}`}
        style={{ width: `${width}%` }}>
        <Tooltip content={tooltip} open={showTooltip && tooltip}><div /></Tooltip>
    </div>
}

export default ColorBox