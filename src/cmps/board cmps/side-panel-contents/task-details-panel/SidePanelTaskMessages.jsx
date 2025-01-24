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

const SidePanelTaskMessages = () => {
    const [updates, setUpdates] = useState();

    useEffect(() => {
        const to = setTimeout(() => {
            setUpdates(demoUpdates)
        }, 1000)
        return () => clearTimeout(to)
    }, [])


    const onUpdateChange = (updatedUpdate) => {
        console.log("🚀 ~ onUpdateChange ~ updatedUpdate:", updatedUpdate)
        const updateIdx = updates.findIndex(update => update._id === updatedUpdate._id);
        const newUpdatesArray = [...updates];
        newUpdatesArray[updateIdx] = updatedUpdate;
        console.log("🚀 ~ onUpdateChange ~ newUpdatesArray:", newUpdatesArray)
        setUpdates(newUpdatesArray);
    }

    const handleNewUpdate = (newUpdate) => {
        setUpdates(updates => [newUpdate, ...updates]);
    }

    return <section className="side-panel-task-messages">
        <SidePanelWriteUpdate
            onAddUpdate={handleNewUpdate}
        />
        <SidePanelUpdateList
            onUpdateChange={onUpdateChange}
            updates={updates}
        />
    </section>
}

export default SidePanelTaskMessages