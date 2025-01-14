export function Side({ info, onTaskUpdate }) {
    return (<section className="task-select">
        <div className="group-color-bar" style={{ backgroundColor: `${info}` }}></div>
        <input type="checkbox" />
    </section>)
}