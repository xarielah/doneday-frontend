import { Button, Flex, Icon, MenuButton, MenuItem, SplitButton, SplitButtonMenu } from "@vibe/core"
import { Filter, Group, Person, Search, Show, Sort } from "@vibe/icons"

const BoardHeaderContextualActions = () => {
    return <Flex className="action" gap="small" align="center">
        <SplitButton children="New task"
            size="small"
            dialogPaddingSize="small"
            secondaryDialogContent={
                <SplitButtonMenu id="split-menu">
                    <MenuItem icon={Group} title="New group of tasks" />
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
        <Button className="icon-button" size="small" ariaLabel="Hide" kind="tertiary">
            <Icon iconSize={20} icon={Show} /> Hide
        </Button>
        <Button className="icon-button" size="small" ariaLabel="Group by" kind="tertiary">
            <Icon iconSize={20} icon={Group} /> Group by
        </Button>
        <MenuButton ariaLabel="More options" />
    </Flex>
}

export default BoardHeaderContextualActions