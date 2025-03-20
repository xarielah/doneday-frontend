import { Text } from "@vibe/core"
import { useEffect, useState } from "react"
import ActivityRow from "./ActivityRow"

const SidePanelTaskActivity = ({ task }) => {
    const [activities, setActivities] = useState(task?.activities || [])

    useEffect(() => {
        setActivities(task?.activities || [])
    }, [task])

    return <section className="side-panel-task-activity">
        {(!activities || activities.length === 0) && <Text className="empty-activities" type="text2" style={{ textAlign: 'center' }}>No activity yet</Text>}
        {(activities && activities.length > 0) && activities.map(activity => <ActivityRow key={activity._id} activity={activity} />)}
    </section>
}

export default SidePanelTaskActivity