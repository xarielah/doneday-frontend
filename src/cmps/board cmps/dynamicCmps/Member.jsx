/* eslint-disable react/prop-types */
export function Member({ info, onTaskUpdate }) {
    return (<div className="column-label-members">{info?.length > 0 && info?.map((member) => member.name + ", ")}</div>)
}