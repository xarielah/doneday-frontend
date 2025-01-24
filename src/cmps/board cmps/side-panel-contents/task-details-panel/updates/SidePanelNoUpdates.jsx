import { Heading, Text } from "@vibe/core"

const SidePanelNoUpdates = () => {
    return <section className="no-updates">
        <Heading type="h3" weight="bold">No updates yet for this item</Heading>
        <Text
            element="p"
            type="text1"
            weight="medium"
            style={{ fontSize: '1.1em', maxWidth: '600px' }}
            align="center"
        >
            Be the first one to update about progress, mention someone or upload files to share with your team members
        </Text>
    </section>
}

export default SidePanelNoUpdates