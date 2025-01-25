import GroupTableContentTask from "./GroupTableContentTask"

const GroupTableContent = ({ group, columnLabels }) => {
    return <section className="group-table-content">
        {group.tasks && group.tasks.map(task =>
            <GroupTableContentTask
                key={task._id}
                task={task}
                columnLabels={columnLabels}
                group={group}
            />
        )}
    </section>
}

export default GroupTableContent