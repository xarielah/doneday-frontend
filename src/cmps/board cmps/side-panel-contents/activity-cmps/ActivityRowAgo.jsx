import { Text } from '@vibe/core';
import { Time } from '@vibe/icons';
import moment from "moment";
import { useEffect, useState } from "react";

export default function ActivityRowAgo({ activity }) {
    const [ago, setAgo] = useState();

    useEffect(() => {
        const fromNow = moment(activity.at).fromNow();
        const number = fromNow.split(' ')[0];
        const prefix = fromNow.split(' ')[1][0];
        // setAgo(`${number}${prefix}`);
        setAgo(`${fromNow}`);
    }, [activity])

    return <div className="activity-row-ago elipsis">
        <Time size={16} /> <Text type="text2" aria-label={`${ago} ago`}>{ago}</Text>
    </div>
}