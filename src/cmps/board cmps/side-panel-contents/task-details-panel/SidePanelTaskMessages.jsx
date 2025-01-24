import { useEffect, useState } from "react";
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
        comments: [
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
        comments: [
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

const SidePanelTaskMessages = () => {
    const [updates, setUpdates] = useState();

    useEffect(() => {
        const to = setTimeout(() => {
            setUpdates(demoUpdates)
        }, 1000)
        return () => clearTimeout(to)
    }, [])

    const handleNewUpdate = (updateText) => {
        const newUpdate = {
            _id: crypto.randomUUID(),
            text: updateText,
            by: {
                _id: 'user101',
                name: 'User 101',
                avatar: ''
            },
        }

        setUpdates(updates => [newUpdate, ...updates])
    }

    const handleUpdateLike = (update) => {
        console.log("update liked", update);
    }

    const handleUpdateReply = (update) => {
        // TODO: Should focus on reply input
        console.log("update replied", update);
    }

    const handleAddReply = (reply) => {
        console.log("reply added", reply);
    }

    return <section className="side-panel-task-messages">
        <SidePanelWriteUpdate
            onAddUpdate={handleNewUpdate}
        />
        <SidePanelUpdateList
            onAddReply={handleAddReply}
            onUpdateLike={handleUpdateLike}
            onUpdateReply={handleUpdateReply}
            updates={updates}
        />
    </section>
}

export default SidePanelTaskMessages