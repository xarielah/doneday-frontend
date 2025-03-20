import { Text } from "@vibe/core";
import { Calendar, Doc, Link, Person, ShortText, Update } from "@vibe/icons";

export default function ActivityRowDynCol({ activity }) {
    let dynCmp;

    switch (activity.cmpType) {
        case 'status':
            dynCmp = <DynCol cmpType={activity.cmpType} icon={<Doc size={16} />} />
            break;
        case 'priority':
            dynCmp = <DynCol cmpType={activity.cmpType} icon={<Doc size={16} />} />
            break;
        case 'members':
            dynCmp = <DynCol cmpType={activity.cmpType} icon={<Person size={16} />} />
            break;
        case 'date':
            dynCmp = <DynCol cmpType={activity.cmpType} icon={<Calendar size={16} />} />
            break;
        case 'timeline':
            dynCmp = <DynCol cmpType={activity.cmpType} icon={<Calendar size={16} />} />
            break;
        case 'link':
            dynCmp = <DynCol cmpType={activity.cmpType} icon={<Link size={16} />} />
            break;
        case 'taskTitle':
            dynCmp = <DynCol cmpType={activity.cmpType} icon={<ShortText size={16} />} />
            break;
        default:
            dynCmp = <DynCol cmpType={activity.cmpType} icon={<Update size={16} />} />
            break;
    }

    return <div className="activity-row-dyn-col elipsis">
        {dynCmp}
    </div>
}

function DynCol({ cmpType, icon }) {
    const cmpTypeLabel = cmpType === 'taskTitle' ? 'Title' : cmpType;
    return <div className="dyn-col">
        {icon} <Text type="text2" aria-label={cmpType} className="capitalize">{cmpTypeLabel}</Text>
    </div>
}