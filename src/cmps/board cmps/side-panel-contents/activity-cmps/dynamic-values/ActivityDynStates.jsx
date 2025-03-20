import { Text } from "@vibe/core";
import { priorityList, statusList } from "../../../../../services/board";

export default function ActivityDynStates({ value, cmpType }) {
    let label;
    if (cmpType === 'priority')
        label = priorityList.find(option => option.value === value)?.label || value;
    else if (cmpType === 'status')
        label = statusList.find(option => option.value === value)?.label || value;

    return <div className={`activity-dyn-states capitalize ${cmpType}-${value}`} style={{ maxWidth: '91px' }}>
        <Text type="text2" aria-label={value} className="placeholder-cmp-value" ellipsis color="inherit">{label}</Text>
    </div>
}   