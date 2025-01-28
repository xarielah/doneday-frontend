import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { BoardDetails } from "../cmps/board cmps/BoardDetails";
import { BoardHeader } from "../cmps/board cmps/BoardHeader";
import { CrudlBar } from "../cmps/board cmps/CrudlBar";
import { boardService } from "../services/board/board.service.local";
import { setBoard } from "../store/actions/board.actions";

export function Board() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const { boardId } = useParams();

    useEffect(() => {
        // console.log(board.name);
        // setBoard(null)

        if (!board || board._id !== boardId) {
            boardService.getById(boardId)
                .then(setBoard)
                .catch(console.error);
        }

    }, [board, boardId])


    useEffect(() => {
    }, [board])

    if (!board) return <div>loading...</div>
    if (board)
        return (
            <section className="board-container">
                <BoardHeader />
                <BoardDetails />
                <CrudlBar />
            </section>
        )
}