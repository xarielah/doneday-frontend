import SidePanelWriteUpdate from "./SidePanelWriteUpdate"

const SidePanelTaskMessages = () => {

    const handleNewUpdate = (update) => {
        console.log('add new message: ', update)
    }

    return <section className="side-panel-task-messages">
        <SidePanelWriteUpdate onAddUpdate={handleNewUpdate} />
    </section>
}

export default SidePanelTaskMessages