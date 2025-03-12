import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { BoardDetails } from "../cmps/board cmps/BoardDetails";
import { BoardHeader } from "../cmps/board cmps/BoardHeader";
import { CrudlBar } from "../cmps/board cmps/CrudlBar";
import { getBoardById, setBoard } from "../store/actions/board.actions";
import { setSelectedTask } from "../store/actions/taskSelect.actions";

export function Board() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)
    const sortBy = useSelector(storeState => storeState.boardModule.sortBy)
    const { boardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getBoardById(boardId, filterBy, sortBy)
            .then(setBoard)
            .catch((err) => {
                navigate('/', { replace: true })
                console.error('Cannot get board', err);
            });

    }, [boards, boardId, filterBy, sortBy])

    useEffect(() => {
        setSelectedTask([])
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