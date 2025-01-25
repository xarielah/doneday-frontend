import { useEffect, useState } from "react";
import { taskService } from "../../../../services/board/task.service.local";
import SidePanelUpdateList from "./updates/SidePanelUpdateList";
import SidePanelWriteUpdate from "./updates/SidePanelWriteUpdate";

const demoUpdates = [
    {
        _id: 'update101',
        text: 'Some text',
        by: {
            _id: 'user101',
            name: 'User 101',
            avatar: ''
        },
        isLiked: false,
        replies: [
            {
                _id: 'comment101',
                text: 'Some comment',
                by: {
                    _id: 'user102',
                    name: 'User 102',
                    avatar: ''
                },

            }
        ]
    },
    {
        _id: 'update102',
        text: 'Some text',
        by: {
            _id: 'user101',
            name: 'User 101',
            avatar: ''
        },
        isLiked: true,
        replies: [
            {
                _id: 'comment102',
                text: 'Some comment',
                by: {
                    _id: 'user102',
                    name: 'User 102',
                    avatar: ''
                },

            }
        ]
    }
]

const SidePanelTaskMessages = ({ task }) => {
    const [updates, setUpdates] = useState();

    useEffect(() => {
        if (task)
            setUpdates(task.replies || [])
    }, [task])

    const onUpdateChange = (updatedUpdate) => {
        const updateIdx = updates.findIndex(update => update._id === updatedUpdate._id);
        const newUpdatesArray = [...updates];
        newUpdatesArray[updateIdx] = updatedUpdate;
        setUpdates(newUpdatesArray);
    }

    const handleUpdateReply = async (newReply) => {
        const updateIdx = updates.findIndex(update => update._id === newReply._id);
        const newUpdatesArray = [...updates];
        newUpdatesArray[updateIdx] = newReply;

        const replyIdx = task.replies.findIndex(reply => reply._id === newReply._id);
        task.replies[replyIdx] = newReply;
        await taskService.update(task);

        setUpdates(newUpdatesArray);
    }

    const handleNewUpdate = async (newUpdateText) => {
        const newUpdate = taskService.getEmptyReply();
        newUpdate.text = newUpdateText;
        newUpdate.groupId = task.groupId;
        task.replies = (task.replies || [])
        task.replies.unshift(newUpdate);
        await taskService.update(task);
        setUpdates(updates => [newUpdate, ...updates]);
    }

    if (!task) return <div>Loading comments...</div>
    return <section className="side-panel-task-messages">
        <SidePanelWriteUpdate
            onAddUpdate={handleNewUpdate}
        />
        <SidePanelUpdateList
            onUpdateChange={onUpdateChange}
            onUpdateReply={handleUpdateReply}
            updates={updates}
        />
    </section>
}

export default SidePanelTaskMessages