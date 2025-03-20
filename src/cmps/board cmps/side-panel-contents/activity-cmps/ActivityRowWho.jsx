import { Avatar, Text } from "@vibe/core";

export default function ActivityRowWho({ activity }) {
    return <div className="activity-row-who elipsis">
        {activity.user.avatar && <Avatar type="img" src={activity.user.avatar} size="small" className="keep-aspect " />}
        {!activity.user.avatar && <Avatar type="text" backgroundColor={activity.user?.color} text={activity.user.name.substring(0, 1)} size="small" className="keep-aspect " />}
        <Text type="text2" aria-label={activity.user.name}>{activity.user.name}</Text>
    </div>
}