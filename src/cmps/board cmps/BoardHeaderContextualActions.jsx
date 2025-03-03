import { Button, Flex, Icon, MenuButton, MenuItem, SplitButton, SplitButtonMenu } from "@vibe/core"
import { Filter, Group, Person, Search, Show, Sort } from "@vibe/icons"

const BoardHeaderContextualActions = ({ onAddGroup, onAddTask }) => {
    return <Flex className="action" gap="small" align="center">
        <SplitButton children="New task"
            size="small"
            dialogPaddingSize="small"
            onClick={onAddTask}
            secondaryDialogContent={
                <SplitButtonMenu id="split-menu">
                    <MenuItem onClick={onAddGroup} icon={Group} title="New group of tasks" />
                </SplitButtonMenu>
            }
        />
        <Button className="icon-button" size="small" ariaLabel="Search" kind="tertiary">
            <Icon iconSize={20} icon={Search} /> Search
        </Button>

        <Button className="icon-button" size="small" ariaLabel="Person" kind="tertiary">
            <Icon iconSize={20} icon={Person} /> Person
        </Button>

        <Button className="icon-button" size="small" ariaLabel="Filter" kind="tertiary">
            <Icon iconSize={20} icon={Filter} /> Filter
        </Button>

        <Button className="icon-button" size="small" ariaLabel="Sort" kind="tertiary">
            <Icon iconSize={20} icon={Sort} /> Sort
        </Button>
    </Flex>
}

export default BoardHeaderContextualActions