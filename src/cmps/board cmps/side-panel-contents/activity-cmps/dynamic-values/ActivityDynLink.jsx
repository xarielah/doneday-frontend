import { Text } from "@vibe/core"
import { Link } from "react-router-dom"

export default function ActivityDynLink({ link }) {
    return <div className="activity-dyn-link">
        {link && <Text type="text2" aria-label={link} className="capitalize">
            <Link to={link.link} target="_blank" rel="noreferrer">{link.displayText}</Link>
        </Text>}
        {(!link || !link.link) && <Text type="text2" style={{ textAlign: 'center' }} className="capitalize">-</Text>}
    </div>
}