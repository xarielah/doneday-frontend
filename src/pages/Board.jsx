import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { BoardDetails } from "../cmps/board cmps/BoardDetails";
import { BoardHeader } from "../cmps/board cmps/BoardHeader";
import { CrudlBar } from "../cmps/board cmps/CrudlBar";
import { boardService } from "../services/board/board.service.local";
import { getBoardById, loadBoards, setBoard, updateBoard } from "../store/actions/board.actions";

export function Board() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const { boardId } = useParams();

    useEffect(() => {
        // setBoard(null)
        // console.log('board', board);
        // console.log(boards);



        // if (!board || board._id !== boardId) {
        getBoardById(boardId)
            .then(setBoard)
            .catch(console.error);
        // }

    }, [boards, boardId])


    useEffect(() => {
        // loadBoards()
        console.log('boards', boards);
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