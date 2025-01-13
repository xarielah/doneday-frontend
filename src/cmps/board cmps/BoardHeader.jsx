/* eslint-disable react/no-children-prop */
import {
    Button,
    Icon,
    IconButton,
    MenuButton,
    Tab,
    TabList,
    Flex,
    SplitButton,
    MenuItem,
    SplitButtonMenu,
} from "@vibe/core";
import {
    Home,
    Search as SearchIcon,
    Person,
    Filter,
    Sort,
    Show,
    Group,
    Notifications,
    Integrations,
    Robot,
    Check,
    Announcement,
} from "@vibe/icons";

export function BoardHeader() {
    return (
        <section
            className="board-header"
        >
            <h2 className="title">Doneday recreate</h2>

            <Flex className="integration" gap="small" align="center">
                <Button size="small" kind="tertiary"><Icon icon={Integrations} />Integrate</Button>
                <Button size="small" kind="tertiary"><Icon icon={Robot} />Automate</Button>
                <IconButton icon={Notifications} ariaLabel="Notifications" badge="1" />
                <Button kind="secondary" size="small">
                    Invite / 3
                </Button>
                <MenuButton ariaLabel="More options" />
            </Flex>

            <Flex className="tabs" flexGrow={1} justify="center">
                <TabList >
                    <Tab icon={Home}>Main Table</Tab>
                    <Tab>Gantt</Tab>
                    <Tab>Chart</Tab>
                    <Tab>File gallery</Tab>
                    <Tab>Form</Tab>
                    <Tab>Kanban</Tab>
                    <Tab>+</Tab>
                </TabList>
            </Flex>

            <Flex className="action" gap="small" align="center">
                <SplitButton children="New task"
                    size="small"
                    secondaryDialogContent={
                        <SplitButtonMenu id="split-menu">
                            <MenuItem icon={Check} title="Hey" />
                            <MenuItem icon={Announcement} title="There" />

                        </SplitButtonMenu>
                    }
                />
                <Button size="small" ariaLabel="Search" kind="tertiary">
                    <Icon icon={SearchIcon} /> Search
                </Button>
                <Button size="small" ariaLabel="Person" kind="tertiary">
                    <Icon icon={Person} /> Person
                </Button>
                <Button size="small" ariaLabel="Filter" kind="tertiary">
                    <Icon icon={Filter} /> Filter
                </Button>
                <Button size="small" ariaLabel="Sort" kind="tertiary">
                    <Icon icon={Sort} /> Sort
                </Button>
                <Button size="small" ariaLabel="Hide" kind="tertiary">
                    <Icon icon={Show} /> Hide
                </Button>
                <Button size="small" ariaLabel="Group by" kind="tertiary">
                    <Icon icon={Group} /> Group by
                </Button>
                <MenuButton ariaLabel="More options" />
            </Flex>


        </section>
    );
}
