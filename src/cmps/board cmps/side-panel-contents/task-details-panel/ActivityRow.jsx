import ActivityRowAgo from "../activity-cmps/ActivityRowAgo";
import ActivityRowDynCol from "../activity-cmps/ActivityRowDynCol";
import ActivityRowWhat from "../activity-cmps/ActivityRowWhat";
import ActivityRowWho from "../activity-cmps/ActivityRowWho";

export default function ActivityRow({ activity }) {
    return <div className="activity-row">
        <ActivityRowAgo activity={activity} />
        <ActivityRowWho activity={activity} />
        <ActivityRowDynCol activity={activity} />
        <ActivityRowWhat activity={activity} />
    </div>
}