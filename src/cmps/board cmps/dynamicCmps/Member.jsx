export function Member({ info, onTaskUpdate }) {
    return (<div>{info.map((member) => member.name + ", ")}</div>)
}