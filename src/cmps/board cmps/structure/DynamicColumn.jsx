import { Date } from "../dynamicCmps/Date";
import { Member } from "../dynamicCmps/Member";
import { Priority } from "../dynamicCmps/Priority";
import { Status } from "../dynamicCmps/Status";

const DynamicColumn = ({ cmpType, info, allMembers, onTaskUpdate }) => {
    switch (cmpType) {
        case "priority":
            return <Priority info={info} onTaskUpdate={onTaskUpdate} />;
        case "status":
            return <Status info={info} onTaskUpdate={onTaskUpdate} />;
        case "members":
            return <Member info={info} allMembers={allMembers} onTaskUpdate={onTaskUpdate} />;
        case "date":
            return <Date info={info} onTaskUpdate={onTaskUpdate} />;
        default:
            return null;
    }
}

export default DynamicColumn