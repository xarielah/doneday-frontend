import { Flex, Tab, TabList, Text } from "@vibe/core"
import { Home } from "@vibe/icons"

const BoardHeadersTabList = () => {
    return <Flex className="tabs" flexGrow={1} justify="center" style={{ marginTop: '8px' }}>
        <TabList size="sm" className="tablist">
            <Tab icon={Home} className="single-tab">
                <Text type="text2">Main Table</Text>
            </Tab>
            <Tab className="single-tab">
                <Text type="text2">Chart</Text>
            </Tab>
        </TabList>
    </Flex>
}

export default BoardHeadersTabList