import { Tooltip } from "@vibe/core"

const tooltipModifiers = [
    {
        name: 'preventOverflow',
        options: {
            mainAxis: false
        }
    },
    {
        name: 'flip',
        options: {
            fallbackPlacements: []
        }
    }
]

const ChevronTooltip = ({ content, children }) => {
    return <Tooltip content={content} modifiers={tooltipModifiers} position="top">
        {children}
    </Tooltip>
}

export default ChevronTooltip