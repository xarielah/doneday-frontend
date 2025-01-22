import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BoardDetails } from "../cmps/board cmps/BoardDetails";
import { BoardHeader } from "../cmps/board cmps/BoardHeader";
import { CrudlBar } from "../cmps/board cmps/CrudlBar";
import { boardService } from "../services/board/board.service.local";
import { setBoard } from "../store/actions/board.actions";

export function Board() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const { boardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        boardService.getById(boardId)
            .then(setBoard)
            .catch(console.error);
    }, [])

    return (
        <section className="board-container">
            <BoardHeader />
            {board === null && <div>loading...</div>}
            {board && <BoardDetails />}
            <CrudlBar />
        </section>
    )
}