import { Box } from "@vibe/core";
import { BoardPreview } from "./BoardPreview.jsx";

export function BoardsSection({boards}) {
    return (
        <Box className="two-boxes-container">
            {boards && boards.length > 0 && boards.map(board =>
                <BoardPreview board={board} key={board.id}></BoardPreview>
            )}
        </Box>
    )
}