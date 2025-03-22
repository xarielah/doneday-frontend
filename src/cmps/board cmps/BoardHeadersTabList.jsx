import { Flex, Tab, TabList, Text } from "@vibe/core"
import { Home } from "@vibe/icons"
import { useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

const BoardHeadersTabList = () => {
    const currentBoard = useSelector(state => state.boardModule.board);
    const navigate = useNavigate();
    const location = useLocation();
    
    const isChartView = location.pathname.includes('/chart');
    const baseUrl = currentBoard?._id ? `/board/${currentBoard._id}` : '/';
    const chartURL = `${baseUrl}/chart`;
    
    const handleTabChange = (index) => {
        if (index === 0) {
            navigate(baseUrl);
        } else if (index === 1) {
            navigate(chartURL);
        }
    };

    return (
        <Flex className="tabs" flexGrow={1} justify="center" style={{ marginTop: '8px' }}>
            <TabList 
                size="sm" 
                className="tablist"
                activeIndex={isChartView ? 1 : 0}
                onTabChange={handleTabChange}
            >
                <Tab icon={Home} className="single-tab">
                    <Text type="text2">Main Table</Text>
                </Tab>
                <Tab className="single-tab">
                    <Text type="text2">Chart</Text>
                </Tab>
            </TabList>
        </Flex>
    );
}

export default BoardHeadersTabList