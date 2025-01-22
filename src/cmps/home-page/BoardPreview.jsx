import { Heading, Box, Avatar, Icon, Text } from "@vibe/core";
import { Info, Favorite } from "@vibe/icons";
import { NavLink } from 'react-router-dom'

export function BoardPreview({ board }) {
    return (
        <NavLink to={`/board/${board._id}`} className="box-link">
            <Box className="box" rounded="medium" key={board._id}>
                <div className="box-icon">
                    <Avatar withoutBorder size="large" type="icon" icon={Info} backgroundColor={board.squareColor} square />
                </div>
                <div className="box-content">
                    <Heading type="h4" color="primary" className="box-header">
                        {board.name}
                    </Heading>
                    <Text>
                        <div className="box-desc">
                            <Icon icon={Favorite} iconSize={20} />
                            {/* <span>{board.subTitle}</span> */}
                        </div>
                    </Text>
                </div>
            </Box>
        </NavLink>
    )
}