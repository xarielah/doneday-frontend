import { Divider, Tab, TabList, Text } from "@vibe/core"
import { Home } from "@vibe/icons"

const SidePanelTaskContentTabs = ({ onTabChange }) => {
    return <TabList tabType="Compact" size="sm" className="task-tablist" onTabChange={onTabChange}>
        <Tab icon={Home} className="single-tab tab-border-right">
            <Text type="text2">Updates</Text>
        </Tab>
        <Divider direction="vertical" className="tab-divider" withoutMargin />
        <Tab value="files" className="single-tab">
            <Text type="text2">Files</Text>
        </Tab>
    </TabList>
}

export default SidePanelTaskContentTabs