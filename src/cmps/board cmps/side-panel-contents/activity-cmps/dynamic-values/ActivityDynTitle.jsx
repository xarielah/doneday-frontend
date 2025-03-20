import { Text } from "@vibe/core";

export default function ActivityDynTitle({ value }) {
    return <div className="activity-dyn-title elipsis">
        {value && <Text type="text2" aria-label={value}>{value}</Text>}
        {!value && <Text type="text2" aria-label={'empty'} style={{ textAlign: 'center' }}>-</Text>}
    </div>
}