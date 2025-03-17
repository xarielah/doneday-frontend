import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BoardDetails } from "../cmps/board cmps/BoardDetails";
import { BoardHeader } from "../cmps/board cmps/BoardHeader";
import { CrudlBar } from "../cmps/board cmps/CrudlBar";
import { getById, setBoard } from "../store/actions/board.actions";

export function Board() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const sortBy = useSelector(storeState => storeState.boardModule.sortBy)
    const { boardId } = useParams();
    const navigate = useNavigate();
    const isWatching = useRef(false)

    useEffect(() => {
        getById(boardId, filterBy, sortBy)
            .then(board => {
                setBoard(board)
            })
            .catch((err) => {
                navigate('/', { replace: true })
                console.error('Cannot get board', err);
            });

    }, [boardId])

    useEffect(() => {

    }, [board])

    useEffect(() => {
        if (board && !isWatching.current) {
            socketService.emit('watch-board', board._id)
            isWatching.current = true
        }
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