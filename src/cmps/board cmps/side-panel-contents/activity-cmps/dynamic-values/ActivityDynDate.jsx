import { Text } from "@vibe/core";
import moment from "moment";

export default function ActivityDynDate({ startDate, endDate }) {
    return <div className="activity-dyn-date">
        {(startDate && !endDate) && <Text type="text2" aria-label={startDate} className="capitalize">{moment(startDate).format('MMM DD, YYYY')}</Text>}
        {(startDate && endDate) && <Text type="text2" aria-label={`${startDate} - ${endDate}`} className="capitalize">{moment(startDate).format('DD/MM')} - {moment(endDate).format('DD/MM')}</Text>}
        {(!startDate && !endDate) && <Text type="text2" style={{ textAlign: 'center' }} className="capitalize">-</Text>}
    </div>
}