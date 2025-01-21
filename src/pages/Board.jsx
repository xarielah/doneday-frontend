import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BoardDetails } from "../cmps/board cmps/BoardDetails";
import { BoardHeader } from "../cmps/board cmps/BoardHeader";
import { boardService } from "../services/board/board.service.local";

export function Board() {
    const [tempBoard, setTempBoard] = useState();
    const { boardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        boardService.getById(boardId)
            .then(board => {
                // TODO: Append it to the crud as current board.
                setTempBoard(board)
            })
            .catch(console.error);
    }, [])

    return (
        <section className="board-container">
            <BoardHeader />
            <BoardDetails />
        </section>
    )
}