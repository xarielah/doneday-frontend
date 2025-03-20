import { DropdownChevronRight } from "@vibe/icons";
import ActivityDynDate from "./dynamic-values/ActivityDynDate";
import ActivityDynLink from "./dynamic-values/ActivityDynLink";
import ActivityDynMem from "./dynamic-values/ActivityDynMem";
import ActivityDynStates from "./dynamic-values/ActivityDynStates";
import ActivityDynTitle from "./dynamic-values/ActivityDynTitle";

export default function ActivityRowWhat({ activity }) {
    return <div className="activity-row-what elipsis">
        <DynamicPrevValues activity={activity} />
    </div>
}

function DynamicPrevValues({ activity }) {
    let dynVal;

    switch (activity.cmpType) {
        case 'status':
            dynVal = <PlaceholderCmp
                rightCmp={<ActivityDynStates value={activity.current} cmpType={activity.cmpType} />}
                leftCmp={<ActivityDynStates value={activity.previous} cmpType={activity.cmpType} />}
            />;
            break;
        case 'priority':
            dynVal = <PlaceholderCmp
                rightCmp={<ActivityDynStates value={activity.current} cmpType={activity.cmpType} />}
                leftCmp={<ActivityDynStates value={activity.previous} cmpType={activity.cmpType} />}
            />;
            break;
        case 'members':
            dynVal = <PlaceholderCmp cmp={<ActivityDynMem prev={activity.previous} next={activity.current} />} />;
            break;
        case 'date':
            dynVal = <PlaceholderCmp
                rightCmp={<ActivityDynDate value={activity.current} />}
                leftCmp={<ActivityDynDate value={activity.previous} />}
            />;
            break;
        case 'timeline':
            dynVal = <PlaceholderCmp
                rightCmp={<ActivityDynDate startDate={activity.current?.startDate} endDate={activity.current?.endDate} />}
                leftCmp={<ActivityDynDate startDate={activity.previous?.startDate} endDate={activity.previous?.endDate} />}
            />;
            break;
        case 'link':
            dynVal = <PlaceholderCmp
                rightCmp={<ActivityDynLink link={activity.current} />}
                leftCmp={<ActivityDynLink link={activity.previous} />}
            />;
            break;
        case 'taskTitle':
            dynVal = <PlaceholderCmp
                rightCmp={<ActivityDynTitle value={activity.current} />}
                leftCmp={<ActivityDynTitle value={activity.previous} />}
            />;
            break;
        default:
            dynVal = <PlaceholderCmp
                rightCmp={activity.current}
                leftCmp={activity.previous}
            />;
            break;
    }

    return <div className="activity-row-what elipsis">
        {dynVal}
    </div>
}

function PlaceholderCmp({ leftCmp, rightCmp, cmp }) {
    return <div className="placeholder-cmp elipsis">
        {cmp && <span style={{ width: '100%' }}>{cmp}</span>}
        {!cmp && <>
            <span style={{ width: '100%' }}>{leftCmp}</span>
            <DropdownChevronRight size={32} color="secondary" />
            <span style={{ width: '100%' }}>{rightCmp}</span>
        </>}
    </div>
}